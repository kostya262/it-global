(function() {
  require('./bootstrap');

  if ($(".register__form").length) {
    new JustValidate('.register__form', {
        rules: {
          email: {
            required: true,
            email: true,
            function: function(name, value) {
              let isEmailOk = false;
              $.ajax('/email-check', {
                data: {
                  "_token": $('meta[name="csrf-token"]').attr('content'),
                  email: value,
                },
                async: false,
                method: 'POST',
                error: function(data1,data2,data3) {
                  console.log(data1,data2,data3);
                },
                success: function(data) {
                  isEmailOk = !data;
                }
              });
              return isEmailOk;
            }
          },
          password: {
            required: true,
            strength: {
              default: true,
            },
            minLength: 6,
            maxLength: 20,
          },
          passwordRepeat: {
            required: true,
            strength: {
              default: true,
            },
            minLength: 6,
            maxLength: 20,
            function: (name, value) => {
              let pass = document
                .getElementById('formPassword')
                .value;
              return pass === value;
            }
          },
          userName: {
              required: true,
              minLength: 3,
              maxLength: 50,
          }
        },
        messages: {
          email: {
            function: 'User with this email already exists'
          },
          passwordRepeat: {
            function: 'Passwords don\'t match'
          }
        },
    });
  }
  if ($(".login__form").length) {
    new JustValidate('.login__form', {
        rules: {
          email: {
            required: true,
            email: true,
          },
          password: {
            required: true,
          }
        },
    });
  }
  if ($(".select").length) {
    $('.select').each(function(index, el) {
      new Choices(el, {
        searchEnabled: false,
      });
    });
  }
  // $('.create-task').magnificPopup({
  //   type: 'inline',
  //   preloader: false,
  //   focus: '#name',

  //   callbacks: {
  //     beforeOpen: function() {
  //       if($(window).width() < 700) {
  //         this.st.focus = false;
  //       } else {
  //         this.st.focus = '#name';
  //       }
  //     }
  //   }
  // });
  // $('#createTask').modal({
  //   fadeDuration: 1000
  // });
})();
