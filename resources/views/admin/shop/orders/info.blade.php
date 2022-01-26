<!-- Modal -->
<div dir="rtl" class="modal fade text-right"  data-bs-backdrop="static" id="InfoCat" tabindex="-1" role="dialog" aria-labelledby="AddModalModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="AddLabel">تفاصيل الطلب</h5>
       
        </div>
            <form action="{{route('delete_cat')}}" method="post">
                @csrf
            <div dir="rtl" class="modal-body text-right">

                <h5> 
                  {{__('Order details')}}
                </h5>
                <div class="form-group">
                    <label for="exampleInputEmail1">
                        {{__('Order ID')}}
                    </label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="" name="name" value="{{$cat->name}}" readonly>
                </div>
                
 
            </div>
            <div class="modal-footer">
             <button type="button" class="btn btn-secondary" data-dismiss="modal">إغلاق</button>
             </a>
            </div>
         </form>
    
        </div>
    </div>
  </div>
  
  
 