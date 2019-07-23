pragma solidity ^0.5.1;

contract apple {
uint id = 0;

struct Apple{
uint id;
address Address;
string name;
string location;
uint depth;
uint length;
uint cost;

string startDate;
string endDate;
bool status;

}

Apple[20] public apples;

mapping (address => uint) public AppleAdress;

 function application(string memory name, string memory location, uint depth, uint length, uint cost,
  string memory sdate, string memory edate) public {
        apples[id] = Apple(id, msg.sender,name, location, depth, length, cost, sdate, edate, false);
       AppleAdress[msg.sender] = id;
       setstatues(id);
        id++;
        }

    function setstatues (uint ApplicationID) public {
        uint orgCount = 0;
        require(keccak256(abi.encodePacked(apples[ApplicationID].location)) == keccak256(abi.encodePacked(("Madinah"))),"Location not Madinah");
        require(apples[ApplicationID].length < 80, "Length bigger than 80");
        require(apples[ApplicationID].depth < 80, "Depth bigger than 80");
    
        for (uint i = 0; i < apples.length; i++){
       if (keccak256(abi.encodePacked(apples[ApplicationID].startDate)) == keccak256(abi.encodePacked((apples[i].startDate)))){
           orgCount++;
       }
        }
        require(orgCount <= 2,"More than 2 applications start at same date");
        apples[ApplicationID].status = true;
    }
    
    function getApplications (uint _id) public view returns
    (string memory, string memory , uint, uint, uint, string memory, string memory, bool){
        uint idd = _id;
        
        return (apples[idd].name, apples[idd].location, apples[idd].depth, apples[idd].length,
             apples[idd].cost, apples[idd].startDate, apples[idd].endDate, apples[idd].status);
    }

        function ArrayLength () public view returns (uint) {
            return uint(apples.length);
        }

   
    }//Contract
    
   

