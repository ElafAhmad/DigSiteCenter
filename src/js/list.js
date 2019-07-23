App = {
    web3Provider: null,
    contracts: {},

    init: function () {
        return App.initWeb3();
    },

    initWeb3: async function () {
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
              // Request account access
              await window.ethereum.enable();
            } catch (error) {
              // User denied account access...
              console.log(error);
              console.error("User denied account access")
            }
          }
          // Legacy dapp browsers...
          else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
          }
          // If no injected web3 instance is detected, fall back to Ganache
          else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
          }
          web3 = new Web3(App.web3Provider);
          
        
        return App.initContract();
    },

    initContract: function () {
        $.getJSON('apple.json', function (data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract.
            var apple = data;
            App.contracts.Apple = TruffleContract(apple);

            // Set the provider for our contract.
            App.contracts.Apple.setProvider(App.web3Provider);
            console.log(App.web3Provider);
            web3.eth.getAccounts(function (error, accounts) {
                if (error) {
                    console.log("Error:" + error);
                }

                var account = accounts[0];
                console.log(accounts)
                console.log(account)


                // Use our contract to retieve idea HERE
                return App.writeToJson();
            });
        });

        //return App.bindEvents();
    },


    writeToJson: async function () {

                App.contracts.Apple.deployed().then(function (instance) {
                    appleInstance = instance;
                    
                    appleInstance.ArrayLength().then(function (length) {
                        
                   
                    console.log(length);
                    let status = "";
                    for (let i = (length.c[0])-1; i >= 0; i--) {
                        console.log(length.c[0]-1);
                        appleInstance.getApplications(i).then(function(application){
                        console.log(application);
                        var appleRow = $('#appleRow');
                        var appleTemplate = $('#appleTemplate');
                        if(application[7]){ status = "Approved"}
                        else {status="Rejected"}
                        appleTemplate.find('#namet').text(application[0]);
                        appleTemplate.find('#locationt').text(application[1]);
                        appleTemplate.find('#sdatet').text(application[5]);
                        appleTemplate.find('#statust').text(status);
                        //appleTemplate.find('#buyBtn').attr('disabled',application[7]);
            
                        appleRow.append(list.html());
                    });
                    }});
                }).then(function (result) {
                    //console.log("everything ok")
                    //add ideas into ideas array in the ideas.json
                    //file.ideas.push({ "id": title1, "title": 2018, "type": this, "actualValue": 1, "Value": 3, "forSale": true });

                }).catch(function (err) {
                    console.log(err.message);
                });

                
        }
           

        };

        $(function () {
            $(window).load(function () {
                App.init();
            });
        });