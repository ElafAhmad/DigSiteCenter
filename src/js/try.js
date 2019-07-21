App = {
    web3Provider: null,
    contracts: {},
  
    init: async function() {
      // Load pets.
      App.init();
      $.getJSON('../applenew.json', function(data) {
        var petsRow = $('#petsRow');
        var petTemplate = $('#petTemplate');
  
        for (i = 0; i < data.length; i ++) {
          petTemplate.find('.panel-title').text(data[i].name);
          petTemplate.find('img').attr('src', data[i].cost);
          petTemplate.find('.pet-breed').text(data[i].depth);
          petTemplate.find('.pet-age').text(data[i].length);
          petTemplate.find('.pet-location').text(data[i].location);
          petTemplate.find('.btn-adopt').attr('data-id', data[i].id);
  
          petsRow.append(petTemplate.html());
        }
      });
  
      return await App.initWeb3();
    },
  
    initWeb3: async function() {//START OF META MASK CHECKS
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
    },//END OF META MASK CHECKS
  
    initContract: function() {
      $.getJSON('apple.json', function(data) {
        // Get the necessary contract artifact file and instantiate it with truffle-contract
        var ApplicationArtifact = data;
        App.contracts.Apple = TruffleContract(ApplicationArtifact);
      
        // Set the provider for our contract
        App.contracts.Apple.setProvider(App.web3Provider);
      
        // Use our contract to retrieve and mark the adopted pets
        // return App.markAdopted();
      });
  
      return App.bindEvents();
    },
  
    bindEvents: function() {
      $(document).on('click', '.btn-adopt', App.handleAdopt);
    },
  
//     markAdopted: function(adopters, account) {
//       var adoptionInstance;
  
//   App.contracts.Adoption.deployed().then(function(instance) {
//     adoptionInstance = instance;
  
//     return adoptionInstance.getAdopters.call();
//   }).then(function(adopters) {
//     for (i = 0; i < adopters.length; i++) {
//       if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
//         $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
//       }
//     }
//   }).catch(function(err) {
//     console.log(err.message);
//   });
  
//     },
  
    handleAdopt: function(event) {
      event.preventDefault();
  
      var ApplicationId = parseInt($(event.target).data('id'));
      var applicationInstance;
  
      web3.eth.getAccounts(function(error, accounts) {
        if (error) {
          console.log(error);
        }
      
        var account = accounts[0];
      
        App.contracts.Apple.deployed().then(function(instance) {
          applicationInstance = instance;
      
          // Execute adopt as a transaction by sending account
          return applicationInstance.setstatues(ApplicationId, {from: account});
        
        });
      });
  
      
    }
  
  };
  
  $(function() {
    $(window).load(function() {
      App.init();
    });
  });
  