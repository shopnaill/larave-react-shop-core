@php
$sidebar = true;
@endphp
@extends('layouts.app')
<style>
    .topbar {
        left: 250px !important;
    }

</style>
@section('content')


    <div class="page-content">

        @if (isset($sub_cat))
            <h1>{{__('Sub Categories')}}</h1>
        @else
            <h1>{{__('Categories')}}</h1>
        @endif
        {{-- Show errors --}}
        @if ($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <div style=" direction: rtl; " class="card">
            <div class="card-body">
                <div class="d-lg-flex align-items-center mb-4 gap-3">
                    <div class="ms-auto"><a href="javascript:;" data-bs-toggle="modal" data-bs-target="#AddCat"
                            class="btn btn-primary radius-30 mt-2 mt-lg-0"><i class="bx bxs-plus-square"></i>
                            {{ __('Add Category') }}
                        </a>
                    </div>
                </div>
                <div style=" direction: rtl; " class="table-responsive text-right">
                    <table class="table mb-0 dataTable">
                        <thead class="table-light">
                            <tr>
                                <th>#</th>
                                <th>
                                    {{ __('Name') }}
                                </th>
                                <th>
                                    {{ __('Description') }}
                                </th>
                                <th>
                                    {{ __('Action') }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($categories as $cat)
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <div class="ms-2">
                                                <h6 class="mb-0 font-14">#{{ $cat->id }}</h6>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{{ $cat->name }}</td>
                                    <td>{{ $cat->description }}</td>
                                    <td>
                                        <div class="d-flex order-actions">
                                            <a data-bs-target="#EditCat" data-bs-toggle="modal" href="javascript:;"
                                                cat_id="{{ $cat->id }}" main_cat_id="{{$cat->category_id}}" cat_name="{{ $cat->name }}"
                                                cat_description="{{ $cat->description }}" class="edit-btn"><i
                                                    class="bx bxs-edit"></i></a>
                                            <a data-bs-target="#DeleteCat" data-bs-toggle="modal" href="javascript:;"
                                                cat_id="{{ $cat->id }}" class="ms-3 delete-btn"><i
                                                    class="bx bxs-trash"></i></a>
                                        </div>
                                    </td>
                                </tr>
                            @endforeach

                        </tbody>
                    </table>
                </div>
            </div>
        </div>


    </div>
    @include('admin.shop.cats.add')
    @include('admin.shop.cats.edit')
    @include('admin.shop.cats.delete')
@endsection

@section('scripts')
    <script src="{{ asset('js/lobibox.min.js') }}"></script>
    <script src="{{ asset('js/notify.js') }}"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.11.3/datatables.min.js"></script>
    <script src="https://cdn.datatables.net/1.11.3/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/rowreorder/1.2.8/js/dataTables.rowReorder.min.js"></script>
    <script src="https://cdn.datatables.net/responsive/2.2.9/js/dataTables.responsive.min.js"></script>

    <script>
        var lightbox = GLightbox({
            'selector': 'glightbox-demo'
        });

        $(document).ready(function() {
            $(document).on('click', '.edit-btn', function() {

                var cat_id = $(this).attr('cat_id');
                var cat_name = $(this).attr('cat_name');
                var cat_description = $(this).attr('cat_description');
                $('.cat_id').val(cat_id);
                $('.cat_name').val(cat_name);
                $('.cat_description').val(cat_description);
                var main_cat_id = $(this).attr('main_cat_id');

                if (main_cat_id !=null)
                {
                    $('.update_form').attr('action', '/admin/update_sub_cat' + '/' + cat_id);
                }else
                {
                    $('.update_form').attr('action', '/admin/update_cat' + '/' + cat_id);
                }
                $('.sel option[value="'+ main_cat_id +'"]').attr('selected', true);
            });

            $('.dataTable').DataTable({
                rowReorder: {
                    selector: 'td:nth-child(2)'
                },
                responsive: true
            });

            $('#DataTables_Table_0_filter').addClass('d-lg-flex align-items-center mb-4 gap-3')
            $('#DataTables_Table_0_filter input').addClass('form-control ps-5 radius-30');
            $('#DataTables_Table_0_filter input').attr('placeholder', 'Search Order');
            //  $('#DataTables_Table_0_filter label').append('<span style=" left: 74px; " class="position-absolute top-50 product-show translate-middle-y"><i class="bx bx-search"></i></span>');
            $('#DataTables_Table_0_filter label').addClass('position-relative');
            $('.dataTables_length').hide();


            setInterval(function() {
                $('.previous').html('<i class="bx bx-skip-next-circle"></i>');
                $('.next').html('<i class="bx bx-skip-previous-circle"></i>');
            }, 500);

            $(document).on('click', '.delete-btn', function() {
                var cat_id = $(this).attr('cat_id');
                $('.cat_id').val(cat_id);
            });
        });
    </script>
@endsection
