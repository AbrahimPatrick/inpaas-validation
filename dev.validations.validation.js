/*
 * ValidationBusinessDelegate
 * dev.validations.validation
 * 
 */
(function ValidationBusinessDelegate(scope) {
  'use strict';

  var L10n = require("inpaas.core.l10n");

  function run(rules, data) {
    var result = {};
    result.isDataValid = true;
    result.message = "";

    for (var key in rules) {
      var keys = key.split(".");

      var container = data;

      for (var position in keys) {
        if (container[keys[position]] || container[keys[position]] === 0 || container[keys[position]] === false) {
          container = container[keys[position]];
          if (keys.length <= position + 1) {
            result = execute({ data: container, rules: rules[key], result: result, fieldname: keys[position] });
          }
        } else {
          if (keys.length <= position + 1 && rules[key].indexOf("required") > -1) {
            result = {
              isDataValid: false,
              message: result.message + L10n.translate("label.cst.validation.required").replace(":campo", keys[position]) + ' '
            }
          }
        }
      }
    }
    return result;
  }

  function execute(parameters) {
    var data = parameters.data;
    var rules = parameters.rules;
    var result = parameters.result;
    var fieldname = parameters.fieldname;

    var arrayRules = rules.split("|");

    for (var key in arrayRules) {
      if (arrayRules[key] == "required") {
        result = required(result, data, fieldname);
      } else if (arrayRules[key] == "number") {
        result = number(result, data, fieldname);
      } else if (arrayRules[key] == "array") {
        result = array(result, data, fieldname);
      } else if (arrayRules[key] == "string") {
        result = string(result, data, fieldname);
      } else if (validateIfIsMaxLength(arrayRules[key])) {
        var limit = null;
        limit = getLimitFromRule(arrayRules[key]);
        result = maxLength(result, data, limit, fieldname);
      } else if (valdidateIfIsEnum(arrayRules[key])) {
        result = optionList(result, data, fieldname, arrayRules[key]);
      }
    }
    return result;
  }

  function required(result, data, fieldname) {
    if ((!data || data === '') && data !== 0 && data !== false) {
      return {
        isDataValid: false,
        message: result.message + L10n.translate("label.cst.validation.required").replace(":campo", fieldname) + ' '
      }
    }

    return result;
  }

  function string(result, data, fieldname) {
    if (data && Object.prototype.toString.call(data) != "[object String]") {
      return {
        isDataValid: false,
        message: result.message + L10n.translate("label.cst.validation.string").replace(":campo", fieldname) + ' '
      }
    }

    return result;
  }

  function maxLength(result, data, limit, fieldname) {
    if (data && !(data.toString().length <= limit)) {
      return {
        isDataValid: false,
        message: result.message + L10n.translate("label.cst.validation.maxlength").replace(":campo", fieldname).replace(":limit", limit) + ' '
      }
    }

    return result;
  }

  function number(result, data, fieldname) {
    if (data && isNaN(data)) {
      return {
        isDataValid: false,
        message: result.message + L10n.translate("label.cst.validation.number").replace(":campo", fieldname) + ' '
      }
    }
    return result;
  }

  function array(result, data, fieldname) {
    if (data && Object.prototype.toString.call(data) != "[object java.util.ArrayList]") {
      return {
        isDataValid: false,
        message: result.message + L10n.translate("label.cst.validation.array").replace(":campo", fieldname) + ' '
      }
    }

    return result;
  }

  function optionList(result, data, fieldname, rule) {
    if (data) {
      var options = rule.replace("in:", "");
      var optionsArray = options.split(",");
      var formatedOptions = "";
      var isDataValid = false;

      for (var key in optionsArray) {
        formatedOptions += optionsArray[key].trim() + " ";
      }

      formatedOptions = "[" + formatedOptions.trim() + "]";

      for (var key in optionsArray) {
        if (optionsArray[key].trim() == data) {
          isDataValid = true;
        }
      }

      if (!isDataValid) {
        return {
          isDataValid: false,
          message: result.message + L10n.translate("label.cst.validation.enum").replace(":campo", fieldname).replace(":options", formatedOptions) + ' '
        }
      }
    }

    return result;
  }

  function getLimitFromRule(rule) {
    var splitedRule = null;
    var limit = null;
    splitedRule = rule.split(":");
    limit = splitedRule[1];

    return limit;
  }

  function validateIfIsMaxLength(rule) {
    if (rule.indexOf("maxLength:") > -1) {
      return true;
    } else {
      return false;
    }
  }

  function valdidateIfIsEnum(rule) {
    if (rule.indexOf("in:") > -1) {
      return true;
    } else {
      return false;
    }
  }

  /*public exports*/
  scope["run"] = run;

  return scope;

})(typeof module !== "undefined" ? module.exports : this);