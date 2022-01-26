<!-- Modal -->
<div dir="rtl" class="modal fade text-right" data-bs-backdrop="static" id="EditCat" tabindex="-1" role="dialog"
    aria-labelledby="AddModalModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="AddLabel">
                    {{ __('Edit Category') }}
                </h5>

            </div>
            <form
                action="{{ isset($sub_cat) ? route('sub_categories.update_sub_cat', 0) : route('categories.update_cat', 0) }}"
                class="update_form" method="post">
                @csrf
                <div dir="rtl" class="modal-body text-right">
                    <div class="form-group">
                        <label for="name">
                            {{ __('Name') }}
                        </label>
                        <input type="text" class="form-control cat_name" id="name" name="name" placeholder="">
                    </div>
                    @if (isset($sub_cat))
                        <div class="sel">
                            <label for="category_id">{{ __('Category') }}</label>
                            <select class="form-control" name="category_id" id="category_id">
                                @foreach ($main_categories as $category)
                                    <option value="{{ $category->id }}">{{ $category->name }}</option>
                                @endforeach
                            </select>
                        </div>

                    @endif
                    <div class="form-group">
                        <label for="name">
                            {{ __('Description') }}
                        </label>
                        <textarea class="form-control cat_description" id="desc" name="description" rows="10"
                            placeholder=""></textarea>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        {{ __('Close') }}
                    </button>
                    <button type="submit" class="btn btn-primary d-flex">
                        {{ __('Save') }}
                        </a>
                </div>
            </form>

        </div>
    </div>
</div>
