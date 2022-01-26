@php
$sidebar = true;
@endphp
@extends('layouts.app')

<link rel="stylesheet"
    href="https://codervent.com/rocker/demo/vertical/assets/plugins/Drag-And-Drop/dist/imageuploadify.min.css">
<style>
    .topbar {
        left: 250px !important;
    }

</style>
@section('content')
    <div class="page-wrapper">

        <div class="page-content">
            <!--breadcrumb-->
            <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">

            </div>
            <!--end breadcrumb-->

            <div class="card">
                <div class="card-body p-4">
                    <h5 class="card-title">
                        {{ __('Add New Product') }}
                    </h5>
                    <hr>

                    <div class="form-body mt-4">
                        <form id="uploadForm" action="{{ route('products.save_product') }}" method="POST"
                            enctype="multipart/form-data">
                            @csrf
                            <div class="row">
                                <div class="col-lg-8">
                                    <div class="border border-3 p-4 rounded">
                                        <div class="mb-3">
                                            <label for="inputProductTitle" class="form-label">
                                                {{ __('Product Name') }}
                                            </label>
                                            <input required type="text" name="name" class="form-control"
                                                id="inputProductTitle" placeholder="">
                                        </div>
                                        <div class="mb-3">
                                            <label for="inputProductDescription" class="form-label">
                                                {{ __('Product Description') }}
                                            </label>
                                            <textarea required class="form-control" name="description"
                                                id="inputProductDescription" rows="3"></textarea>
                                        </div>
                                        <div class="mb-3">
                                            <label for="inputProductDescription" class="form-label">
                                                {{ __('Product Images') }}
                                            </label>
                                            <input id="image-uploadify" name="images[]" type="file" accept="image/*"
                                                multiple="" style="display: none;">

                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="border border-3 p-4 rounded">
                                        <div class="row g-3">
                                            <div class="col-md-6">
                                                <label for="inputPrice" class="form-label">
                                                    {{ __('Price') }}
                                                </label>
                                                <input required type="number" step="0.01" name="price"
                                                    class="form-control" id="inputPrice" placeholder="00.00">
                                            </div>
                                            <div class="col-md-6">
                                                <label for="inputCompareatprice" class="form-label">
                                                    {{ __('Compare at price') }}
                                                </label>
                                                <input required name="old_price" type="number" step="0.01"
                                                    class="form-control" id="inputCompareatprice" placeholder="00.00">
                                            </div>

                                            <div class="col-12">
                                                <label for="inputProductType" class="form-label">
                                                    {{ __('Category') }}
                                                </label>
                                                <select required name="category_id" class="form-select"
                                                    id="inputProductType">
                                                    <option>Select category...</option>
                                                    {{-- main categores option group name --}}
                                                    @foreach ($categories as $category)
                                                        <optgroup label="{{ $category->name }}">
                                                            {{-- sub categories option group name --}}
                                                            @foreach ($category->subCategories as $sub_category)
                                                                <option value="{{ $sub_category->id }}">
                                                                    {{ $sub_category->name }}</option>
                                                            @endforeach
                                                        </optgroup>
                                                    @endforeach

                                                </select>
                                            </div>

                                            <div class="col-12 mb-2">
                                                <div class="progress">
                                                    <div class="progress-bar progress-bar-striped progress-bar-animated"
                                                        role="progressbar" aria-valuenow="0" aria-valuemin="0"
                                                        aria-valuemax="100" style="width: 0%"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="d-grid">
                                                <button type="submit" class="btn btn-warning">
                                                    {{ __('Save') }}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <!--end row-->
                    </form>
                </div>
            </div>
        </div>


    </div>
    </div>
    @include('admin.shop.success')
@endsection

@section('scripts')
    <script src="{{ asset('js/lobibox.min.js') }}"></script>
    <script src="{{ asset('js/notify.js') }}"></script>
    <script src="{{ asset('js/imageUpload.js') }}"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.js"></script>
    <script>
        $(document).ready(function() {
            $('#image-uploadify').imageuploadify();
        })
    </script>
@endsection
