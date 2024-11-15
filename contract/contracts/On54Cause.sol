// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

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
        uint256 targetAmount;
        uint256 currentAmount;
        address beneficiary;
        address[] donors;
        address charity;
        Status status;
        bytes32 associatedEvent;
    }

    mapping(bytes32 => Fundraising) public fundraisings;
    mapping(bytes32 => Event) public events;
    mapping(IERC20 => bool) public tokens;

    // charity -> token -> balance
    mapping(address => mapping(address => uint256)) public charityBalances;

    event EventCreated(Event eventDetails);
    event FundraisingCreated(Fundraising fundraisingDetails);
    event EventCompleted(Event eventDetails);
    event EventCancelled(Event eventDetails);
    event TokenWhitelisted(IERC20 token);
    event TokenBlacklisted(IERC20 token);

    function createEvent(Event memory _event) public {
        _event.id = keccak256(abi.encode(_event.title, _event.organiser));
        events[_event.id] = _event;
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

    function completeEvent(bytes32 _event) public {
        require(
            msg.sender == events[_event].organiser,
            "User not allowed to complete event"
        );
        require(events[_event].status == Status.OPEN, "Event is not open");
        events[_event].status = Status.COMPLETED;

        emit EventCompleted(events[_event]);
    }

    function createFundraising(Fundraising memory _fundraising) public {
        require(
            events[_fundraising.associatedEvent].status == Status.OPEN,
            "Event is not open"
        );
        _fundraising.id = keccak256(
            abi.encode(_fundraising.associatedEvent, _fundraising.beneficiary)
        );
        require(
            fundraisings[_fundraising.id].id == bytes32(0),
            "Fundraising already exists"
        );
        fundraisings[_fundraising.id] = _fundraising;
        emit FundraisingCreated(_fundraising);
    }

    function getFundraising(
        bytes32 _id
    ) public view returns (Fundraising memory) {
        return fundraisings[_id];
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
        fundraisings[_fundraisingId].currentAmount += _amount;
    }
}
