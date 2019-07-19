App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initWeb3();
  },

  initWeb3: async function () {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
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


  initContract: function() {
      //THIS IS THE API IF YOU ARE USING REMIX 
    $.getJSON('apple.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var application = data;
      App.contracts.application = TruffleContract(application);

      // Set the provider for our contract.
      App.contracts.application.setProvider(App.web3Provider);
      console.log(App.web3Provider);
      web3.eth.getAccounts(function(error, accounts) {
        if (error) {
          console.log("Error:"+ error);
        }
  
        var account = accounts[0];
        console.log(accounts)
        console.log(account)


      // Use our contract to retieve  application HERE
      return App.getapplication();
    });
  }); 