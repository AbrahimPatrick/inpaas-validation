

/*
 * ModeloCriacaoValidation
 * dev.validations.modelocriacaovalidation
 * 
 */
(function CriarAtendimentoValidation(scope) {
  'use strict';
  var validation = require("dev.validations.validation");

  function run(data) {
    var rules = getRules();
    var result = validation.run(rules, data);

    return result;
  }

  function getRules() {
    return {
      "ticket": "required|object|rename:Objeto ticket",
      "ticket.sitecategory": "required|number|maxLength:20",
      "ticket.casedescription": "string|maxLength:20000",
      "ticket.caseoriginid": "required|number|maxLength:20",
      "person": "required|object",
      "person.personname": "required|string|maxLength:100",
      "person.nickname": "string|maxLength:100",
      "person.birthdate": "date:YYYY-MM-DD HH:MI:SS|maxLength:40",
      "person.otherinfo": "string|maxLength:100",
      "person.integrationcode": "string|maxLength:100",
      "person.employees": "number|maxLength:20",
      "person.billingamount": "decimal:2|maxLength:18",
      "person.gender": "maxLength:1|in:M, F",
      "person.docnumber1": "string|maxLength:20",
      "person.docnumber2": "required|string|maxLength:20",
      "person.docnumber3": "string|maxLength:20",
      "person.dopersontype": "maxLength:1|in:P, C",
      "person.addresstypeid1": "number|maxLength:20",
      "person.countryid1": "number|maxLength:20",
      "person.stateid1": "number|maxLength:20",
      "person.cityid1": "number|maxLength:20",
      "person.cityname1": "string|maxLength:100",
      "person.streettypeid1": "number|maxLength:20",
      "person.streetaddress1": "string|maxLength:255",
      "person.addressnumber1": "string|maxLength:20",
      "person.zipcode1": "string|maxLength:20",
      "person.addressdetail1": "string|maxLength:50",
      "person.addressreference1": "string|maxLength:255",
      "person.neighborhood1": "string|maxLength:100",
      "person.addresstypeid2": "number|maxLength:20",
      "person.countryid2": "number|maxLength:20",
      "person.stateid2": "number|maxLength:20",
      "person.cityid2": "number|maxLength:20",
      "person.cityname2": "string|maxLength:100",
      "person.streettypeid2": "number|maxLength:20",
      "person.streetaddress2": "string|maxLength:255",
      "person.addressnumber2": "string|maxLength:20",
      "person.zipcode2": "string|maxLength:20",
      "person.addressdetail2": "string|maxLength:50",
      "person.addressreference2": "string|maxLength:255",
      "person.neighborhood2": "string|maxLength:100",
      "person.email1": "email|maxLength:100",
      "person.email2": "email|maxLength:100",
      "person.phonecountrycode1": "string|maxLength:10",
      "person.phonecitycode1": "string|maxLength:10",
      "person.phonenumber1": "string|maxLength:20",
      "person.phoneextension1": "string|maxLength:20",
      "person.phonecountrycode2": "string|maxLength:10",
      "person.phonecitycode2": "string|maxLength:10",
      "person.phonenumber2": "string|maxLength:20",
      "person.phoneextension2": "string|maxLength:20",
      "person.phonecountrycode3": "string|maxLength:10",
      "person.phonecitycode3": "string|maxLength:10",
      "person.phonenumber3": "string|maxLength:20",
      "person.phoneextension3": "string|maxLength:20",
      "person.socialmedia1": "string|maxLength:100",
      "person.socialmedia2": "string|maxLength:100",
      "person.socialmedia3": "string|maxLength:100",
      "person.socialmedia4": "string|maxLength:100",
      "person.jobtitleid": "number|maxLength:20",
      "person.jobid": "number|maxLength:20",
      "person.corporatesegmentid": "number|maxLength:20",
      "person.maritalstatusid": "number|maxLength:20",
      "person.persontitleid": "number|maxLength:20",
      "person.persontypeid": "number|maxLength:20",
      "person.donotcontactbyphone": "in:Y, N",
      "person.donotcontactbyaddress": "in:Y, N",
      "person.donotcontactbyemail": "in:Y, N",
      "person.inactiverecord": "in:Y, N",
      "person.donotcontactbysms": "in:Y, N",
      "person.companyoriginid": "number|maxLength:20",
      "person.companystatusid": "number|maxLength:20",
      "person.companysizeid": "number|maxLength:20",
      "person.companyclassificationid": "number|maxLength:20",
    }
  }

  /*public exports*/
  scope["run"] = run;

  return scope;

})(typeof module !== "undefined" ? module.exports : this);