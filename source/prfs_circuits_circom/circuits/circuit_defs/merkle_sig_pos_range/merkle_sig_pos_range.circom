pragma circom 2.1.2;

include "../../../node_modules/circomlib/circuits/comparators.circom";

include "../../gadgets/tree.circom";
include "../../gadgets/poseidon/poseidon.circom";
include "../../gadgets/bigint.circom";
include "../../gadgets/secp256k1_func.circom";

template MerkleSigPosRange(nLevels) {
    signal input assetSize;
    signal input assetSizeGreaterEqThan;
    signal input assetSizeLessThan;

    signal input sigUpper;
    signal input sigLower;

    /// merkle proof
    // leaf = pos(pos(sig, 0), assetSize)
    signal input leaf;
    signal input root;
    signal input pathIndices[nLevels];
    signal input siblings[nLevels];

    signal input nonce;
    signal input ephemeralPubKeyX;
    signal input serialNo;
    signal input pubKeySerialNo;

    component greaterEqThan = GreaterEqThan(16);
    greaterEqThan.in[0] <-- assetSize;
    greaterEqThan.in[1] <-- assetSizeGreaterEqThan;
    greaterEqThan.out === 1;

    component lessThan = LessThan(16);
    lessThan.in[0] <-- assetSize;
    lessThan.in[1] <-- assetSizeLessThan;

    log("lessThan", lessThan.out);
    lessThan.out === 1;

    component poseidon1 = Poseidon();
    poseidon1.inputs[0] <== sigUpper;
    poseidon1.inputs[1] <== sigLower;
    var _sig = poseidon1.out;
    log("sigUpper", sigUpper, "sigLower", sigLower, "_sig", _sig);

    component poseidon2 = Poseidon();
    poseidon2.inputs[0] <== _sig;
    poseidon2.inputs[1] <== assetSize;
    log("leaf", leaf, "computed", poseidon2.out);
    leaf === poseidon2.out;

    component poseidon3 = Poseidon();
    poseidon3.inputs[0] <== _sig;
    poseidon3.inputs[1] <== nonce;
    // log("serialNo", serialNo, "computed", poseidon3.out);
    serialNo === poseidon3.out;

    component poseidon4 = Poseidon();
    poseidon4.inputs[0] <== _sig;
    poseidon4.inputs[1] <== ephemeralPubKeyX;
    pubKeySerialNo === poseidon4.out;

    component merkleProof = MerkleTreeInclusionProof(nLevels);
    merkleProof.leaf <== leaf;

    for (var i = 0; i < nLevels; i++) {
        merkleProof.pathIndices[i] <== pathIndices[i];
        merkleProof.siblings[i] <== siblings[i];
    }

    log("root", root, "merkleProof root", merkleProof.root);

    root === merkleProof.root;
}
