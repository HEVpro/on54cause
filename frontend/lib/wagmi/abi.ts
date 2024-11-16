interface AbiInput {
    internalType: string
    name: string
    type: string
    indexed?: boolean
    components?: AbiInput[]
}

interface AbiOutput {
    internalType: string
    name: string
    type: string
    components?: AbiOutput[]
}

interface AbiItem {
    inputs?: AbiInput[]
    stateMutability?: string
    type: string
    name?: string
    anonymous?: boolean
    outputs?: AbiOutput[]
    components?: AbiInput[]
}

export const abi: AbiItem[] = [
    {
        inputs: [],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
        ],
        name: 'OwnableInvalidOwner',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
        ],
        name: 'OwnableUnauthorizedAccount',
        type: 'error',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'bytes32',
                name: 'fundraisingId',
                type: 'bytes32',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'contract IERC20',
                name: 'token',
                type: 'address',
            },
        ],
        name: 'DonationReceived',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'bytes32',
                name: 'id',
                type: 'bytes32',
            },
            {
                indexed: false,
                internalType: 'string',
                name: 'title',
                type: 'string',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'organiser',
                type: 'address',
            },
        ],
        name: 'EventCancelled',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'bytes32',
                name: 'id',
                type: 'bytes32',
            },
            {
                indexed: false,
                internalType: 'string',
                name: 'title',
                type: 'string',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'organiser',
                type: 'address',
            },
        ],
        name: 'EventCompleted',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'bytes32',
                name: 'id',
                type: 'bytes32',
            },
            {
                indexed: false,
                internalType: 'string',
                name: 'title',
                type: 'string',
            },
            {
                indexed: false,
                internalType: 'string',
                name: 'description',
                type: 'string',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'organiser',
                type: 'address',
            },
        ],
        name: 'EventCreated',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'bytes32',
                name: 'fundraisingId',
                type: 'bytes32',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'targetAmount',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'beneficiary',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'charity',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'enum On54Cause.Status',
                name: 'status',
                type: 'uint8',
            },
            {
                indexed: false,
                internalType: 'bytes32',
                name: 'associatedEvent',
                type: 'bytes32',
            },
        ],
        name: 'FundraisingCreated',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'previousOwner',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'newOwner',
                type: 'address',
            },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'contract IERC20',
                name: 'token',
                type: 'address',
            },
        ],
        name: 'TokenBlacklisted',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'contract IERC20',
                name: 'token',
                type: 'address',
            },
        ],
        name: 'TokenWhitelisted',
        type: 'event',
    },
    {
        inputs: [
            {
                internalType: 'contract IERC20',
                name: '_token',
                type: 'address',
            },
            {
                internalType: 'contract IChronicle',
                name: '_oracle',
                type: 'address',
            },
        ],
        name: 'addOrUpdateOracle',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint32',
                name: '_date',
                type: 'uint32',
            },
            {
                internalType: 'string',
                name: '_title',
                type: 'string',
            },
            {
                internalType: 'string',
                name: '_description',
                type: 'string',
            },
            {
                internalType: 'string',
                name: '_imgUrl',
                type: 'string',
            },
            {
                internalType: 'address',
                name: '_organiser',
                type: 'address',
            },
        ],
        name: 'adminCreateEvent',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IERC20',
                name: '_token',
                type: 'address',
            },
        ],
        name: 'blacklistToken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '_event',
                type: 'bytes32',
            },
            {
                internalType: 'contract IERC20[]',
                name: '_tokens',
                type: 'address[]',
            },
        ],
        name: 'cancelEvent',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'contract IERC20',
                name: '',
                type: 'address',
            },
        ],
        name: 'charityBalances',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '_event',
                type: 'bytes32',
            },
            {
                internalType: 'contract IERC20[]',
                name: '_tokens',
                type: 'address[]',
            },
        ],
        name: 'completeEvent',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint32',
                name: '_date',
                type: 'uint32',
            },
            {
                internalType: 'string',
                name: '_title',
                type: 'string',
            },
            {
                internalType: 'string',
                name: '_description',
                type: 'string',
            },
            {
                internalType: 'string',
                name: '_imgUrl',
                type: 'string',
            },
        ],
        name: 'createEvent',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '_targetAmount',
                type: 'uint256',
            },
            {
                internalType: 'bytes32',
                name: '_associatedEvent',
                type: 'bytes32',
            },
            {
                internalType: 'address',
                name: '_beneficiary',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '_charity',
                type: 'address',
            },
        ],
        name: 'createFundraising',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '_amount',
                type: 'uint256',
            },
            {
                internalType: 'bytes32',
                name: '_fundraisingId',
                type: 'bytes32',
            },
            {
                internalType: 'address',
                name: '_token',
                type: 'address',
            },
        ],
        name: 'donate',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        name: 'events',
        outputs: [
            {
                internalType: 'bytes32',
                name: 'id',
                type: 'bytes32',
            },
            {
                internalType: 'address',
                name: 'organiser',
                type: 'address',
            },
            {
                internalType: 'uint32',
                name: 'date',
                type: 'uint32',
            },
            {
                internalType: 'string',
                name: 'title',
                type: 'string',
            },
            {
                internalType: 'string',
                name: 'description',
                type: 'string',
            },
            {
                internalType: 'string',
                name: 'imgUrl',
                type: 'string',
            },
            {
                internalType: 'enum On54Cause.Status',
                name: 'status',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        name: 'fundraisings',
        outputs: [
            {
                internalType: 'bytes32',
                name: 'id',
                type: 'bytes32',
            },
            {
                internalType: 'uint256',
                name: 'targetAmount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'amountRaised',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: 'beneficiary',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'charity',
                type: 'address',
            },
            {
                internalType: 'enum On54Cause.Status',
                name: 'status',
                type: 'uint8',
            },
            {
                internalType: 'bytes32',
                name: 'associatedEvent',
                type: 'bytes32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_charity',
                type: 'address',
            },
            {
                internalType: 'contract IERC20[]',
                name: '_tokens',
                type: 'address[]',
            },
        ],
        name: 'getCharityBalance',
        outputs: [
            {
                components: [
                    {
                        internalType: 'contract IERC20',
                        name: 'token',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'amount',
                        type: 'uint256',
                    },
                ],
                internalType: 'struct On54Cause.TokenRaised[]',
                name: '',
                type: 'tuple[]',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '_id',
                type: 'bytes32',
            },
        ],
        name: 'getEvent',
        outputs: [
            {
                components: [
                    {
                        internalType: 'bytes32',
                        name: 'id',
                        type: 'bytes32',
                    },
                    {
                        internalType: 'address',
                        name: 'organiser',
                        type: 'address',
                    },
                    {
                        internalType: 'uint32',
                        name: 'date',
                        type: 'uint32',
                    },
                    {
                        internalType: 'string',
                        name: 'title',
                        type: 'string',
                    },
                    {
                        internalType: 'string',
                        name: 'description',
                        type: 'string',
                    },
                    {
                        internalType: 'string',
                        name: 'imgUrl',
                        type: 'string',
                    },
                    {
                        internalType: 'enum On54Cause.Status',
                        name: 'status',
                        type: 'uint8',
                    },
                    {
                        internalType: 'bytes32[]',
                        name: 'fundraisings',
                        type: 'bytes32[]',
                    },
                ],
                internalType: 'struct On54Cause.Event',
                name: '',
                type: 'tuple',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '_event',
                type: 'bytes32',
            },
            {
                internalType: 'contract IERC20[]',
                name: '_tokens',
                type: 'address[]',
            },
        ],
        name: 'getEventTokensRaised',
        outputs: [
            {
                components: [
                    {
                        internalType: 'contract IERC20',
                        name: 'token',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'amount',
                        type: 'uint256',
                    },
                ],
                internalType: 'struct On54Cause.TokenRaised[]',
                name: '',
                type: 'tuple[]',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '_id',
                type: 'bytes32',
            },
        ],
        name: 'getFundraising',
        outputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'enum On54Cause.Status',
                name: '',
                type: 'uint8',
            },
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IERC20',
                name: '',
                type: 'address',
            },
        ],
        name: 'oracles',
        outputs: [
            {
                internalType: 'contract IChronicle',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'owner',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IERC20',
                name: '',
                type: 'address',
            },
        ],
        name: 'tokens',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'newOwner',
                type: 'address',
            },
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IERC20',
                name: '_token',
                type: 'address',
            },
        ],
        name: 'whitelistToken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
]
