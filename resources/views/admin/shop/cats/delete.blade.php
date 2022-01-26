<!-- Modal -->
<div dir="rtl" class="modal fade text-right" data-bs-backdrop="static" id="DeleteCat" tabindex="-1" role="dialog"
    aria-labelledby="AddModalModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="AddLabel">
                    {{ __('Delete Category') }}
                </h5>

            </div>
            <form action="{{ isset($sub_cat) ? route('sub_categories.delete_sub_cat') :  route('categories.delete_cat') }}" method="post">
                @csrf
                <div dir="rtl" class="modal-body text-right">

                    <h5>
                        {{ __('are you sure you want to delete this category') }}
                    </h5>
                    <input type="hidden" class="cat_id" name="cat_id">


                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        {{ __('cancel') }}
                    </button>
                    <button type="submit" class="btn btn-danger d-flex">
                        {{ __('delete') }}
                        </a>
                </div>
            </form>

        </div>
    </div>
</div>
