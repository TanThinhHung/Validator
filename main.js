//đối tượng là Validator
function Validator(options) {
    // console.log( typeof option.form);
    var formElement = document.querySelector(options.form);
    console.log(formElement);
    console.log(options.rules);



    function OutputError(inputElement, rule) {
        var errorMessage = rule.test(inputElement.value);

        var errorElement = inputElement.parentElement.querySelector(options.errorMessage)//trỏ đến thẻ span thông báo message;
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
        options.rules.forEach(function (rule) {
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
                inputElement.oninput =function()
                {
                    var errorElement = inputElement.parentElement.querySelector(options.errorMessage);
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid');
                }
            }
        });
    }
    // if()
    // }
    //định nghĩa các rules//
    //bắt buộc nhập
}
Validator.isRequired = function (selector) {
    return {
        selector: selector,
        //trả function dùng cho trường hợp kiểm tra bắt buộc nhập kiểm tra điều kiện người dùng nhập
        test: function (value) {
            //nguyên tắc của rule 
            return value.trim() ? undefined : 'Vui lòng nhập trường này!'
        }
    };
}
//bắt buộc phải là email
Validator.isEmail = function (selector) {
    return selector;
}
//bắt buộc phải là số điện thoại
Validator.isPhone = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(value) ? undefined : 'Số điện thoại không đúng định dạng!';
        }
    }
}