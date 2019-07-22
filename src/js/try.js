App = {
    web3Provider: null,
    contracts: {},
  
    init: async function() {
      // Load pets.
      App.init();
      // $.getJSON('../applenew.json', function(data) {
      //   var petsRow = $('#petsRow');
      //   var petTemplate = $('#petTemplate');
  
      //   for (i = 0; i < data.length; i ++) {
      //     petTemplate.find('.panel-title').text(data[i].name);
      //     petTemplate.find('img').attr('src', data[i].cost);
      //     petTemplate.find('.pet-breed').text(data[i].depth);
      //     petTemplate.find('.pet-age').text(data[i].length);
      //     petTemplate.find('.pet-location').text(data[i].location);
      //     petTemplate.find('.btn-adopt').attr('data-id', data[i].id);
  
      //     petsRow.append(petTemplate.html());
      //   }
      // });
  
      return App.initWeb3();
    },
  
    initWeb3: async function() {//START OF META MASK CHECKS
      // Modern dapp browsers...
  // if (window.ethereum) {
  //   App.web3Provider = window.ethereum;
  //   try {
  //     // Request account access
  //     await window.ethereum.enable();
  //   } catch (error) {
  //     // User denied account access...
  //     console.error("User denied account access")
  //   }
  // }
  // // Legacy dapp browsers...
  // else if (window.web3) {
  //   App.web3Provider = window.web3.currentProvider;
  // }
  // // If no injected web3 instance is detected, fall back to Ganache
  // else {
  //   App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
  // }
  // web3 = new Web3(App.web3Provider);
  if (typeof web3 !== 'undefined'){
    App.web3Provider = web3.currentProvider;
  } else {
    App.web3Provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545');
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
      
           web3.eth.getAccounts(function(error, accounts) {
        if (error) {
          console.log(error);
        }
      
        var account = accounts[0];
           });
          });
         
      return App.bindEvents();
    },
  
    bindEvents: function() {
      $(document).on('click', '#buttonS', App.handleApply);
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
  
    handleApply: function(event) {
      event.preventDefault();
      
      var Aname = $('#name').val();
      var Alocation = $('#location').val();
      var Alength = $('#length').val();
      var Adepth = $('#depth').val();
      var AsDate = $('#sDate').val();
      var AeDate = $('#eDate').val();
      var cost = $('#cost').val();
      console.log(Aname+"\n"+Alocation+"\n"+Alength+"\n"+Adepth+"\n"+AsDate+"\n"+AeDate+"\n"+cost+"\n");

      //var ApplicationId = parseInt($(event.target).data('id'));
      var applicationInstance;
      App.contracts.Apple.deployed().then(function(instance) {
        applicationInstance = instance;
        return applicationInstance.application(Aname.toString(), Alocation.toString(), Adepth, Alength, cost, AsDate.toString(), AeDate.toString());
      }).then(function(result){
        alert('Application was added!');
            }).catch(function(err){
              console.log(err.message);
            })
  
      // web3.eth.getAccounts(function(error, accounts) {
      //   if (error) {
      //     console.log(error);
      //   }
      
      //   var account = accounts[0];
      
      //   App.contracts.Apple.deployed().then(function(instance) {
      //     applicationInstance = instance;
      
      //     // Execute adopt as a transaction by sending account
      //     return applicationInstance.setstatues(ApplicationId, {from: account});
        
      //   });
      // });
  
      
    }
  
  };
  
  $(function() {
    $(window).load(function() {
      App.init();
    });
  });
  