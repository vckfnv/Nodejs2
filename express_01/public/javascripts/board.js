$('#btn_logout').on('click',function(){
    window.location.replace('/board/logout');
  });
  
$('#btn_prev').on('click',function() {
  if($('#page').val()==1){
    alert('this is a first page');
  }else{
    window.location.replace('/board/pages?pagenum='+$('#page').val());
  }
});

$('#btn_next').on('click', function() {
  window.location.replace('/board/pages?pageNum='+$('#page').val());
});

$('h1').on('click',function(){
  console.log(typeof($('#page_id').val()));
  console.log(parseInt($('#page_id').text()));

});

$('#page').on('focus',function() {
  $('#page').blur();
})


$('#btnSubmit').on('click', function() {
  if ($('#search_ind').val()=="Class"){
      alert('select one industry!');
      return;
  }else{
      $('#search_form').submit();
  }
});

$('#btnEdit').on('click',function() {
  window.location.replace('/board/useredit');
})

$('#btnList').on('click',function(){
  window.location.replace('/board/');
})

$('#btnClass').on('click',function(){
  if ($('#veg_class').val()=="Class"){
    alert('select one class!');
    return;
}else{
    $('#class_form').submit();
}
});