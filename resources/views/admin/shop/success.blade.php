<!-- Modal -->
<div dir="rtl" class="modal fade text-right"  data-bs-backdrop="static" id="Success" tabindex="-1" role="dialog" aria-labelledby="AddModalModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="SuccessLabel">
            {{__('Upload Success')}}
          </h5>
       
        </div>
        
              <div dir="rtl" class="modal-body text-right">
                 {{__('Product Added Successfully')}}
            </div>
            <div class="modal-footer">
            <a href="{{route('home')}}" class="btn btn-success d-flex">
              {{__('Check Now')}}
            </a>
            </div>
        </div>
    </div>
  </div>
  
  
 