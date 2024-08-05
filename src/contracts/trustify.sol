// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract CertificateStorage {
    struct Certificate {
        bytes32 hash;
        bool exists;
    }

    mapping(bytes32 => bytes32) certificateHashes;
    Certificate[] certificates;

    function storeCertificate(string memory instituteID, string memory userID, string memory certificateFormatID) external returns (bytes32) {
        bytes32 hashValue = keccak256(abi.encodePacked(instituteID, userID, certificateFormatID));
        certificates.push(Certificate(hashValue, true));
        bytes32 combinedID = keccak256(abi.encodePacked(instituteID, certificateFormatID));
        certificateHashes[combinedID] = hashValue;
        return hashValue;
    }

    function verifyHash(bytes32 hashValue) external view returns (bool) {
        for (uint256 i = 0; i < certificates.length; i++) {
            if (certificates[i].hash == hashValue && certificates[i].exists) {
                return true;
            }
        }
        return false;
    }
}
