//đối tượng là Validator
function Validator(options) {
    // console.log( typeof option.form);
    var formElement = document.querySelector(options.form);
    console.log(formElement);
    console.log(options.rules);
//lắng nghe sự kiện submitform
if(formElement){
    formElement.onsubmit = function(e){
         e.preventDefault();
        
         options.rules.forEach(function(rule){
             //lặp qua tùng rule và validate luôn
            var inputElement = formElement.querySelector(rule.selector);
            OutputError(inputElement,rule);
         })
    }
}

    //tạo ra một selectorRules để lưu tất cả rule những selector vào object rỗng
    var selectorRules = {}

    function OutputError(inputElement, rule) {
        console.log(options.rule);

        var errorMessage; //= rule.test(inputElement.value);
        //lấy ra các rules của selector
        var ruleOfSelector = selectorRules[rule.selector];
        //lặp qua từng rule kiểm tra
        //nếu errormessage xuất hiện thông báo thì thoát hỏi vòng for.
        for (var i = 0; i < ruleOfSelector.length; i++) {
                    //   console.log(ruleOfSelector[i]);
                    errorMessage = ruleOfSelector[i](inputElement.value);
                    if(errorMessage) break;
                    // console.log(errorMessage);
        }

        //var errorElement = inputElement.parentElement.querySelector(options.errorMessage)//trỏ đến thẻ span thông báo message;
    
        const elementParent = inputElement.closest(options.form);
    
        console.log(elementParent);
        var errorElement = elementParent.querySelector(options.errorMessage);
        console.log(errorElement);
        
        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        }
        else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
        }
    }

    if (formElement) {
        //
        options.rules.forEach(function (rule) {
            //lưu lại cái rules cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            }
            else {
                selectorRules[rule.selector] = [rule.test];
            }
            console.log(selectorRules[rule.selector]);
            //  selectorRules[rule.selector] = rule.test;//ghi rules cuối cùng sẽ ghi đè

            console.log(rule.selector);
            var inputElement = formElement.querySelector(rule.selector);
            console.log(inputElement);

            if (inputElement) {
                //lắng nghe sự kiện blur
                inputElement.onblur = function () {
                    console.log('blur ' + inputElement.value);
                    //kiểm tra thông tin nếu là người dùng chưa nhập thì in ra lỗi
                    //lấy được value: inputElement.value
                    //test func : rule.test

                    OutputError(inputElement, rule);
                    // console.log(inputElement.parentElement.querySelector('.form-message'));
                    // console.log(errorMessage);
                }
                inputElement.oninput = function () {
                    var errorElement = inputElement.parentElement.querySelector(options.errorMessage);
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid');
                }
            }
        });
        console.log(selectorRules);
    }
    // if()
    // }
    //định nghĩa các rules//
    //bắt buộc nhập
}
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        //trả function dùng cho trường hợp kiểm tra bắt buộc nhập kiểm tra điều kiện người dùng nhập
        test: function (value) {
            //nguyên tắc của rule 
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này!'
        }
    };
}
//bắt buộc phải là email
Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            var regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regx.test(value) ? undefined : "Trường này phải là email!"
        }
    };
}
//bắt buộc phải là số điện thoại
Validator.isPhone = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(value) ? undefined : 'Trường này phải là số điện thoại!';
        }
    }
}
//tối thiểu tám ký tự,ít nhất một chữ cái và một số
Validator.isPassword = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            var regx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            return regx.test(value) ? undefined : 'Mật khẩu tối thiểu 8 ký tự, ít nhất một chữ cái và một số';
        }
    }
}
Validator.isComfirmedPass = function (selector, getComfirmValue) {
    return {
        selector: selector,
        test: function (value) {
            return value === getComfirmValue() ? undefined : "Giá trị nhập vào không chính xác";
        }
    }
}
// const elementParent = inputElement.closest(options.formGroupSelector);
// const errorElement = elementParent.querySelector(options.errorSelector);
