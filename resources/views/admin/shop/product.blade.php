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
    <div class="page-wrapper">

        <div class="page-content">


            <div class="card">
                <div class="row g-0">
                    <div class="col-md-4 border-end">
                        <a class="glightbox-demo" href="{{ asset('storage/' . $product->cover) }}"><img
                                src="{{ asset('storage/' . $product->cover) }}" class="img-fluid" alt="..."></a>
                        <div class="row  g-2 justify-content-center mt-3">
                            @foreach ($images as $image)
                                <div class="col"><a class="glightbox-demo"
                                        href="{{ asset('storage/' . $image->image) }}"><img
                                            src="{{ asset('storage/' . $image->image) }}" width="100%"
                                            class="border rounded cursor-pointer" alt=""></a></div>
                            @endforeach
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h4 class="card-title">{{ $product->name }}</h4>
                            <div class="mb-3">
                                <span class="price h4">{{ $product->price }} EGP</span>
                            </div>
                            <p class="card-text fs-6">{{ $product->description }}</p>

                            <hr>
                            <div class="row row-cols-auto row-cols-1 row-cols-md-3 align-items-center">
                                <div class="col">
                                    <label class="form-label">الكمية</label>
                                    <div class="input-group input-spinner">
                                        <button class="btn btn-white" type="button" id="button-plus"> + </button>
                                        <input type="text" id="quantity" class="form-control" value="1">
                                        <button class="btn btn-white" type="button" id="button-minus"> − </button>
                                    </div>
                                </div>

                            </div>
                            <div class="d-flex gap-3 mt-3">
                                <a href="{{ route('create_order') }}" product_id="{{ $product->id }}"
                                    class="btn add_to_cart btn-warning">
                                    {{ __('Buy now') }}
                                </a>
                                <a href="#" product_id="{{ $product->id }}" cover="{{ $product->cover }}"
                                    class="btn add_cart_only add_to_cart btn-outline-warning"><span class="text">
                                        {{ __('Add to cart') }}
                                    </span> <i class="bx bxs-cart-alt"></i></a>
                            </div>
                        </div>
                    </div>
                </div>


            </div>


            <h6 class="text-uppercase mb-0">
                {{ __('Related Products') }}
            </h6>
            <hr>
            <div class="row row-cols-1 row-cols-lg-3">

                @foreach ($related as $product)
                    <div class="col">
                        <a href="{{ route('product', $product->id) }}">
                            <div class="card">
                                <div class="row g-0">
                                    <div class="col-md-4">
                                        <img src="{{ asset('storage/' . $product->cover) }}" class="img-fluid"
                                            alt="...">
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h6 class="card-title">{{ $product->name }}</h6>
                                            <div class="clearfix">
                                                <p class="mb-0 float-start fw-bold"><span
                                                        class="me-2 text-decoration-line-through text-secondary">{{ $product->old_price }}
                                                        EGP </span><span>{{ $product->price }} EGP</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                @endforeach

            </div>


        </div>
    </div>
@endsection

@section('scripts')
    <script src="{{ asset('js/app.js') }}"></script>
    <script src="{{ asset('js/notify.js') }}"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.js"></script>

    <script>
        var lightbox = GLightbox({
            'selector': 'glightbox-demo'
        });


        $(document).ready(function() {


            $('#button-minus').click(function(e) {
                var value = parseInt($('#quantity').val());
                if (value > 1) {
                    value--;
                }
                $('#quantity').val(value);
            });

            $('#button-plus').click(function(e) {
                var value = parseInt($('#quantity').val());
                value++;
                $('#quantity').val(value);
            });

            $(document).on('click', '.add_to_cart', function() {
                var product_id = $(this).attr('product_id');
                var quantity = $('#quantity').val();
                var cover = $(this).attr('cover');
                $.ajax({
                    url: "/add_to_cart/" + product_id + '/' + quantity,
                    type: "GET",
                    data: {
                        product_id: product_id,
                        quantity: quantity,
                        _token: "{{ csrf_token() }}"
                    },
                    beforeSend: function() {
                        var load = '{{ asset('load.gif') }}';
                        $('.add_cart_only').html('<img style="width: 28px;" src="' + load +
                            '" class="img-fluid">');
                        $('.add_cart_only').attr('disabled', true);
                    },
                    success: function(data) {
                        if (data.success) {
                            Lobibox.notify('default', {
                                pauseDelayOnHover: true,
                                title: '{{ $product->name }}',
                                continueDelayOnInactiveTab: false,
                                img: '/storage/' + cover,
                                position: 'top right',
                                msg: data.success
                            });
                            $('.add_cart_only').html(
                                '<span class="text">أضافة للسلة</span> <i class="bx bxs-cart-alt"></i>'
                                );
                            $('.add_cart_only').attr('disabled', false);
                            $.ajax({
                                url: "/count_cart",
                                type: "GET",
                                data: {
                                    _token: "{{ csrf_token() }}"
                                },
                                success: function(data) {
                                    if (data) {
                                        $('#cart-count').text(data);
                                    }
                                }
                            });

                        } else {
                            Lobibox.notify('error', {
                                size: 'mini',
                                rounded: true,
                                icon: 'fa fa-times-circle',
                                delayIndicator: false,
                                position: 'top right',
                                msg: data.error
                            });
                        }
                    }
                });
            });

        });
    </script>
@endsection
