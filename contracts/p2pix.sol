// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;


contract PTwoPIX {

    event DepositAdded(address indexed seller, bytes32 depositId, address token, uint256 amount);
    event WithdrawSucceeded(address indexed seller, bytes32 depositId, address token, uint256 amount);
    event LockAdded(address indexed buyer, bytes32 lockId, uint256 amount);
    event LockReleased(bytes32 lockId);

    struct Deposit {
        address seller;
        address token;          // ERC20 stable token address
        uint256 amount;         // Total amount of tokens deposited
        uint256 remaining;      // Remaining tokens available
        bool valid;             // Could be invalidated by the seller
    }

    struct Lock {
        address targetAddress;          // Where goes the tokens when validated
        address relayerAddress;         // Relayer address that facilitated this transaction
        address relayerPremium;         // Amount to be paid for relayer
        uint256 amount;                 // Amount to be transfered to buyer
        uint256 expirationBlock;        // IF not paid until this block will be expired
        bool paid;
    }

    // Default blocks that lock will hold tokens
    uint256 defaultLockBlocks;
    // List of valid Bacen signature addresses
    mapping(address => bool) validBacenAddresses;


    // Seller list of deposits
    mapping(address => bytes32[]) sellerDeposits;
    mapping(address => uint16) sellerDepositsSize;
    mapping(bytes32 => Deposit) mapDeposits;

    // ***** ESTA PARTE É A MAIS CRÍTICA VISTO QUE É NECESSÁRIO FORMAS DE TRAVAR DEPOSITOS *****
    // ************ PORÉM SEM A NECESSIDADE DE PERCORRER GRANDES ARRAYS ************************
    // List of Locks made to deposits
    mapping(bytes32 => bytes32[]) depositLocks;		// Prevent multiple locks with same ID
    mapping(bytes32 => uint16) depositLocksSize;
    mapping(bytes32 => Lock) mapLocks;

    modifier onlySeller(bytes32 depositID) {
        require(mapDeposits[depositID].seller == msg.sender, "P2PIX: Only seller could call this function.");
        _;
    }

    // Vendedor precisa mandar token para o smart contract + chave PIX destino. Retorna um DepositID.
    function deposit(
        address token,
        uint256 amount,
        string calldata pixTarget
    ) public returns (bytes32 depositID){

    }

    // Relayer interage adicionando um “lock” na ordem de venda.
    // O lock precisa incluir address do comprador + address do relayer + reembolso/premio relayer + valor.
    // **Só poder ter um lock em aberto para cada (ordem de venda, valor)**.
    // Só pode fazer lock de ordens que não estão invalidadas(Passo 5).
    // Essa etapa pode ser feita pelo vendedor conjuntamente com a parte 1.
    // Retorna um LockID.
    function lock(
        bytes32 depositID,
        address targetAddress,
        address relayerAddress,
        uint256 relayerPremium,
        uint256 amount
    ) public returns (bytes32 lockID){

    }

    // Relayer interage com o smart contract, colocando no calldata o comprovante do PIX realizado.
    // Smart contract valida o comprovante, manda os tokens para o endereço do pagador, e reembolsa o custo do gás para o endereço do relayer especificado na parte (2).
    function release(
        bytes32 lockID,
        uint256 pixTimestamp,
        uint256 pixSignature
    ) public {

    }

    // Vendedor pode invalidar da ordem de venda impedindo novos locks na mesma (isso não afeta nenhum lock que esteja ativo).
    function cancelDeposit(bytes32 depositID) public onlySeller(depositID) {

    }

    // Após os locks expirarem, vendedor pode interagir c/ o contrato e recuperar os tokens de um depósito específico.
    function withdraw(bytes32 depositID) public onlySeller(depositID) {
        // Withdraw remaining tokens from mapDeposit[depositID]
    }

}