// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

contract On54Cause is Ownable {
    constructor() Ownable(msg.sender) {}

    enum Status {
        OPEN,
        CANCELLED,
        COMPLETED
    }

    struct Event {
        bytes32 id;
        address organiser;
        uint32 date;
        string title;
        string description;
        string imgUrl;
        Status status;
        bytes32[] fundraisings;
    }

    struct Fundraising {
        bytes32 id;
        uint256 targetAmount; // target amount in USD
        mapping(IERC20 => uint256) donations;
        address beneficiary;
        address charity;
        Status status;
        bytes32 associatedEvent;
    }

    struct TokenRaised {
        IERC20 token;
        uint256 amount;
    }

    mapping(bytes32 => Fundraising) public fundraisings;
    mapping(bytes32 => Event) public events;
    mapping(IERC20 => bool) public tokens;

    // charity -> token -> balance
    mapping(address => mapping(address => uint256)) public charityBalances;

    event EventCreated(Event eventDetails);
    event FundraisingCreated(
        bytes32 fundraisingId,
        uint256 targetAmount,
        address beneficiary,
        address charity,
        Status status,
        bytes32 associatedEvent
    );
    event EventCompleted(Event eventDetails);
    event EventCancelled(Event eventDetails);
    event TokenWhitelisted(IERC20 token);
    event TokenBlacklisted(IERC20 token);
    event DonationReceived(bytes32 fundraisingId, uint256 amount, IERC20 token);

    function createEvent(
        uint32 _date,
        string memory _title,
        string memory _description,
        string memory _imgUrl
    ) public {
        require(_date > block.timestamp, "Event date is in the past");
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_description).length > 0, "Description cannot be empty");
        require(bytes(_imgUrl).length > 0, "Image URL cannot be empty");
        bytes32 _id = keccak256(abi.encode(_title, msg.sender));
        Event memory _event = Event({
            id: _id,
            organiser: msg.sender,
            date: _date,
            title: _title,
            description: _description,
            imgUrl: _imgUrl,
            status: Status.OPEN,
            fundraisings: new bytes32[](0)
        });
        events[_id] = _event;
        emit EventCreated(_event);
    }

    function getEvent(bytes32 _id) public view returns (Event memory) {
        return events[_id];
    }

    function cancelEvent(bytes32 _event) public {
        require(
            msg.sender == events[_event].organiser,
            "User not allowed to cancel event"
        );
        require(events[_event].status == Status.OPEN, "Event is not open");
        events[_event].status = Status.CANCELLED;
        emit EventCancelled(events[_event]);

        // TODO: Logic to store funds for future events
    }

    function getEventTokensRaised(
        bytes32 _event,
        IERC20[] memory _tokens
    ) public view returns (TokenRaised[] memory) {
        TokenRaised[] memory tokenRaised = new TokenRaised[](_tokens.length);
        require(events[_event].organiser != address(0), "Event does not exist");
        require(
            events[_event].fundraisings.length > 0,
            "No fundraisings for this event"
        );

        for (uint256 i = 0; i < _tokens.length; i++) {
            uint256 amount = 0;
            for (uint256 j = 0; j < events[_event].fundraisings.length; j++) {
                // Ensure that the fundraising ID is valid
                bytes32 fundraisingId = events[_event].fundraisings[j];
                require(
                    fundraisings[fundraisingId].targetAmount > 0,
                    "Invalid fundraising ID"
                );
                amount += fundraisings[fundraisingId].donations[_tokens[i]];
            }
            tokenRaised[i] = TokenRaised(_tokens[i], amount);
        }
        return tokenRaised;
    }

    function completeEvent(bytes32 _event, IERC20[] memory _tokens) public {
        require(
            msg.sender == events[_event].organiser,
            "User not allowed to complete event"
        );
        require(events[_event].status == Status.OPEN, "Event is not open");
        require(
            events[_event].fundraisings.length > 0,
            "No fundraisings associated with this event"
        );

        TokenRaised[] memory tokenRaised = getEventTokensRaised(
            _event,
            _tokens
        );

        for (uint256 i = 0; i < tokenRaised.length; i++) {
            require(
                tokenRaised[i].token.transfer(
                    events[_event].organiser,
                    tokenRaised[i].amount
                ),
                "Token transfer failed"
            );
        }

        emit EventCompleted(events[_event]);
    }

    function createFundraising(
        uint256 _targetAmount,
        bytes32 _associatedEvent,
        address _beneficiary,
        address _charity
    ) public {
        require(
            events[_associatedEvent].status == Status.OPEN,
            "Event is not open"
        );
        require(_targetAmount > 0, "Target amount must be greater than 0");
        require(_beneficiary != address(0), "Beneficiary cannot be 0 address");
        require(_charity != address(0), "Charity cannot be 0 address");
        require(_charity != _beneficiary, "Charity cannot be the beneficiary");
        bytes32 _fundraisingId = keccak256(
            abi.encode(_associatedEvent, _beneficiary)
        );
        require(
            fundraisings[_fundraisingId].targetAmount == 0,
            "Fundraising already exists"
        );
        events[_associatedEvent].fundraisings.push(_fundraisingId);
        Fundraising storage _fundraising = fundraisings[_fundraisingId];
        _fundraising.targetAmount = _targetAmount;
        _fundraising.associatedEvent = _associatedEvent;
        _fundraising.beneficiary = _beneficiary;
        _fundraising.charity = _charity;
        emit FundraisingCreated(
            _fundraisingId,
            _targetAmount,
            _beneficiary,
            _charity,
            Status.OPEN,
            _associatedEvent
        );
    }

    function getFundraising(
        bytes32 _id
    )
        public
        view
        returns (bytes32, uint256, address, address, Status, bytes32)
    {
        Fundraising storage _fundraising = fundraisings[_id];
        return (
            _fundraising.id,
            _fundraising.targetAmount,
            _fundraising.beneficiary,
            _fundraising.charity,
            _fundraising.status,
            _fundraising.associatedEvent
        );
    }

    function whitelistToken(IERC20 _token) public onlyOwner {
        require(!tokens[_token], "Token already whitelisted");
        tokens[_token] = true;
        emit TokenWhitelisted(_token);
    }

    function blacklistToken(IERC20 _token) public onlyOwner {
        require(tokens[_token], "Token is not whitelisted");
        tokens[_token] = false;
        emit TokenBlacklisted(_token);
    }

    function donate(
        uint256 _amount,
        bytes32 _fundraisingId,
        IERC20 _token
    ) public {
        require(tokens[_token], "Token not whitelisted");
        _token.transferFrom(msg.sender, address(this), _amount);
        fundraisings[_fundraisingId].donations[_token] += _amount;
        emit DonationReceived(_fundraisingId, _amount, _token);
    }
}
