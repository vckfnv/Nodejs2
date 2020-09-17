
/*$('#login').on('click',function(){
  window.location.replace('/board');
});*/
var isCheckedId = false;

document.querySelector('.img__btn').addEventListener('click', function() {
  document.querySelector('.cont').classList.toggle('s--signup');
});

$('.forgot-pass').on('click', function(){
  var findid = prompt('Enter your id');
  console.log(findid+'hi');
  console.log(typeof(findid));
  if(findid){
    $.ajax({
      url:'/login/findpwd?findid='+findid,
      method:'GET',
      success:function(data){
        if(data=='No data'){
          $('#message4').text(data);
        }else if(data=='Error'){
          $('#message4').text(data);
        }else{
          $('#message4').text('your password is '+'\''+data+'\'');
        }
      },
      error: function(err){
        console.log(err);
        $('#message4').text('error occured..');
      }
    });
  }else{
    alert('');
  }
});


$('#btn_login').on('click', function() {
  $.ajax({
      url:'/login/process',
      method:'POST',
      dataType:'json',
      contentType:'application/json',
      data:JSON.stringify({'login_id':$('#login_id').val(),
                            'login_pwd':$('#login_pwd').val()  }),
      success:function(data) {
          console.log(data);
          if(data.status == 'OK') {
              window.location.replace('/board');
          } else {
              $('#message4').text(data.err_msg);
              $('#message4').css({
                animation: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
                transform: 'translate3d(0, 0, 0)',
                backfaceVisibility: 'hidden',
                perspective: '1000px',
                color: 'red'});
          }
      },
      error:function(err) {
          console.log(err);
          $('#message4').text(err.responseText);
      }
  });
});

$('#btn_checkid').on('click', function() {
  if(($('#signup_id').val().length < 3) || ($('#signup_id').val().length >10)) {
    $('#message').text('Between 3~10 words');
    $('#message').css('color','red');
    
  } else {
      $.ajax({
          url:'/login/checkid?signup_id='+$('#signup_id').val(),
          method:'GET',
          success:function(data) {
              if(data == 'OK') {
                  isCheckedId = true;
                  $('#message').text('ID available');
                  $('#message').css('color','green');
              } else if(data == 'DUPLICATED') {
                  isCheckedId = false;
                  $('#message').text('ID not available');  
                  $('#message').css('color','red');  
              } else {
                  isCheckedId = false;
                  $('#message').text('error occured, retry..2');
              }
          },
          error:function(err) {
              isCheckedId = false;
              $('#message').text('error 발생, 재시도..1');
          }
      });
  }
});

$('#btn_signup').on('click', function() {
  if(!isCheckedId) {
    $('#message3').text('ID Check First');
    $('#signup_id').css('box-shadow','0 0 3px red');
    setTimeout(function(){
    $('#signup_id').css('box-shadow','0 0 0 white');
    },2000);
    $('#signup_id').css('transition-duration','0.5s');
    $('#signup_id').css({
      animation: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
      transform: 'translate3d(0, 0, 0)',
      backfaceVisibility: 'hidden',
      perspective: '1000px'});
      return;
  }
  if($('#signup_name').val().length < 3) {
    $('#message3').text('Too short name');
    $('#signup_name').css('box-shadow','0 0 3px red');
    setTimeout(function(){
    $('#signup_name').css('box-shadow','0 0 0 white');
    },2000);
    $('#signup_name').css('transition-duration','0.5s');
    $('#signup_name').css({
      animation: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
      transform: 'translate3d(0, 0, 0)',
      backfaceVisibility: 'hidden',
      perspective: '1000px'});
      return;
  }
  if($('#signup_pwd').val() != $('#confirm_pwd').val() ) {    
    $('#message3').text('Check passwords alright');
    $('#confirm_pwd').css('box-shadow','0 0 3px red');
    setTimeout(function(){
    $('#confirm_pwd').css('box-shadow','0 0 0 white');
    },2000);
    $('#confirm_pwd').css('transition-duration','0.5s');
    $('#confirm_pwd').css({
      animation: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
      transform: 'translate3d(0, 0, 0)',
      backfaceVisibility: 'hidden',
      perspective: '1000px'});
      return;
  }
  if ($('#signup_pwd').val()==""){
    $('#message3').text('No Passwords');
    $('#signup_pwd').css('box-shadow','0 0 3px red');
    setTimeout(function(){
    $('#signup_pwd').css('box-shadow','0 0 0 white');
    },2000);
    $('#signup_pwd').css('transition-duration','0.5s')
    $('#signup_pwd').css({
      animation: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
      transform: 'translate3d(0, 0, 0)',
      backfaceVisibility: 'hidden',
      perspective: '1000px'});
    return;
  }
  $('#message3').text('connecting..');
  $.ajax({
      url:'/login/signup',
      method:'POST',
      dataType:'json',
      contentType:'application/json',
      data:JSON.stringify({
          'user_id':$('#signup_id').val(),
          'user_pwd':$('#signup_pwd').val(),
          'user_name':$('#signup_name').val(),
          'user_adr':$('#signup_adr').val(),
          'user_email':$('#signup_email').val(),
          'user_pnum':$('#tel1').val()+'-'+$('#tel2').val()+'-'+$('#tel3').val(),
          'user_class':$('#selectClass').val()
      }),
      success:function(data) {
          if(data.status == 'OK') {
              window.location.replace('/');
          } else {
              $('#message3').text('error 발생, 재시도..1');    
          } 
      }, 
      error:function(err) {
          console.log(err);
          $('#message3').text('error 발생, 재시도..2');
      }
  });
});

$('#signup_id').keyup(function(){
  isCheckedId = false;
  $('#message').text('');
});

$('#tel1').keyup(function() {
  if($('#tel1').val().length>=3){
    $('#tel2').focus();
  }
});

$('#tel2').keyup(function() {
  if($('#tel2').val().length>3){
    $('#tel3').focus();
  }
});

$('#confirm_pwd').keyup(function() {
  if ($('#confirm_pwd').val()!=$("#signup_pwd").val()){
    $('#message2').text('Password not Confirm');
    $('#message2').css('color','red');  
  }else if($('#confirm_pwd').val().length==0){
    $('#message2').text('');
  }else{
    $('#message2').text('Password Confirm');
    $('#message2').css('color','green');
  }  
});

