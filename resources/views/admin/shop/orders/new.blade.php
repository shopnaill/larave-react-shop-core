@php
    $sidebar = true;
@endphp
@extends('layouts.app')
<style>
  .topbar {
    left: 250px!important;
  }
</style>
@section('content')


<div class="page-wrapper">
    <div class="page-content">
        <!--breadcrumb-->
        <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
   
        </div>
        <!--end breadcrumb-->
      
          <div class="row">
            @if (session()->has('cart') && count(session()->get('cart')) == 0 || !session()->has('cart'))
            <div class="col-md-12">
                <div class="alert border-0 border-start border-5 border-secondary alert-dismissible fade show py-2">
                    <div class="d-flex align-items-center">
                        <div class="font-35 text-secondary"><i class="bx bx-info-square"></i>
                        </div>
                        <div class="ms-3">
                            <h6 class="mb-0 text-secondary">
                                {{__('Cart is empty')}}
                            </h6>
                            <div>
                                <div>{{__('There are no products in the shopping cart, add some to place an order')}} </div>
                            </div>
                             <br>
                            <a href="{{route('shop')}}" class="btn btn-secondary  ">{{__('Shopping now')}} <i class="fa fa-shopping-cart"></i></a>
                        </div>
                    </div>
                 </div>
            </div>
            @else
              <div class="col-md-4">
                <div class="card">
                    <div dir="rtl" class="card-body text-right">
                        <h4>
                            {{__('Order Details')}}
                        </h4>
                        <div class="row">
                            <div class="col-md-3">
                                 {{__('Product')}}
                             </div>
                             <div class="col-md-3">
                                  {{__('Price')}}
                             </div>
                             <div class="col-md-3">
                                  {{__('Quantity')}}
                             </div>
                             <div class="col-md-3">
                                    {{__('Total')}}
                             </div>
                             <div class="col-md-12">
                                 <hr>
                             </div>
                              @php
                                $total = 0;
                              @endphp
                         @if (session()->has('cart') && count(session()->get('cart')) > 0)

                            @foreach (session()->get('cart') as $key => $item)
                            <a href="{{route('remove_from_cart' , $item['product_id'])}}" class="remove-from-cart text-danger">
                                <i class="bx bxs-trash"></i>
                            </a>
                            <div class="col-md-3">
                               #{{$key+1}} <img class="img-fluid" width="100" src="{{asset('storage/'.  $item['cover'])}}" alt="" srcset=""> {{$item['name']}}
                            </div>
                            <div class="col-md-3">
                                <strong>{{$item['price']}} EGP</strong>
                            </div>
                            <div class="col-md-3">
                                <strong>{{$item['quantity']}}</strong>
                            </div>
                            <div class="col-md-3">
                                <strong>{{$item['price'] * $item['quantity']}} EGP</strong>
                            </div>
                            @endforeach
                            @endif

                            <div class="col-md-12">
                                <hr>
                                 <div class="row">
                                     <div class="col-md-6">
                                         الاجمالي : 
                                     </div>
                                        <div class="col-md-6">
                                            @if (session()->has('cart') && count(session()->get('cart')) > 0)
                                            @foreach (session()->get('cart') as $key => $item)
                                            @php
                                                $total += $item['price'] * $item['quantity'];
                                            @endphp
                                            @endforeach       
                                            @endif

                                             <strong>{{$total}} EGP</strong>

                                        </div>
                                 </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
              </div>
              <div class="col-md-8">
                <div class="card">
                    <div dir="rtl" class="card-body text-right">
                         <h4>
                             {{__('Create Order')}}
                         </h4>
 
                         <form action="{{route('save_order')}}" method="post">
                            @csrf
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="name">
                                            {{__('Name')}}
                                        </label>
                                        <input type="text" required name="name" id="phone" class="form-control">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="">
                                            {{__('Phone')}}
                                        </label>
                                        <input required type="text" name="phone" id="phone" class="form-control" multiple>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="address">
                                    {{__('Address')}}
                                </label>
                                <textarea required name="address" id="address" cols="30" rows="3" class="form-control"></textarea>
                            </div>

                            <div class="form-group">
                                <button class="btn btn-primary">
                                    {{__('Buy')}}
                                </button>
                            </div>
                         </form>
                    </div>
                </div>
              </div>
            @endif
          </div>


    </div>
</div>
   @endsection

@section('scripts')
<script src="{{asset('js/app.js')}}"></script>
<script src="{{asset('js/lobibox.min.js')}}"></script>
<script src="{{asset('js/notify.js')}}"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.js"></script>

<script>
 var lightbox = GLightbox({'selector': 'glightbox-demo'});

 

</script>
@endsection