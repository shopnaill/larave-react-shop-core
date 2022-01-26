<!-- Modal -->
<div dir="rtl" class="modal fade text-right" data-bs-backdrop="static" id="AddCat" tabindex="-1" role="dialog"
    aria-labelledby="AddModalModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="AddLabel">
                    {{ __('Add Category') }}
                </h5>

            </div>
            <form action="{{ isset($sub_cat) ? route('sub_categories.save_sub_cat') : route('categories.save_cat') }}"
                method="post">
                @csrf
                <div dir="rtl" class="modal-body text-right">
                    <div class="form-group">
                        <label for="name">
                            {{ __('Name') }}
                        </label>
                        <input type="text" class="form-control" id="name" name="name" placeholder="">
                    </div>
                    @if (isset($sub_cat))
                        <label for="category_id">{{ __('Category') }}</label>
                        <select class="form-control" name="category_id" id="category_id">
                            @foreach ($main_categories as $category)
                                <option value="{{ $category->id }}">{{ $category->name }}</option>
                            @endforeach
                        </select>
                    @endif
                    <div class="form-group">
                        <label for="name">
                            {{ __('Description') }}
                        </label>
                        <textarea class="form-control" id="desc" name="description" rows="10"
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
