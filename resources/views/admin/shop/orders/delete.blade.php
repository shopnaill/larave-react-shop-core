<!-- Modal -->
<div dir="rtl" class="modal fade text-right"  data-bs-backdrop="static" id="DeleteCat" tabindex="-1" role="dialog" aria-labelledby="AddModalModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="AddLabel">
            {{__("Delete Order")}}  
          </h5>
       
        </div>
            <form action="{{route('delete_order')}}" method="post">
                @csrf
            <div dir="rtl" class="modal-body text-right">

                <h5> 
                    {{__("Are you sure you want to delete this order?")}}
                </h5>
                <input type="hidden" class="order_id" name="order_id">
 
 
            </div>
            <div class="modal-footer">
             <button type="button" class="btn btn-secondary" data-dismiss="modal">
                {{__("Close")}}
             </button>
             <button type="submit" class="btn btn-danger d-flex">
                {{__("Delete")}}
            </a>
            </div>
         </form>
    
        </div>
    </div>
  </div>
  
  
 