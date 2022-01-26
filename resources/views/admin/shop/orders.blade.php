@php
    $sidebar = true;
@endphp
@extends('layouts.app')
<style>
  .topbar {
    left: 250px!important;
  }
  .details {
    background-color: #fff;
    padding: 22px;
    position: fixed;
    top: 10%;
    right: 10%;
    bottom: 10%;
    left: 10%;
    z-index: 99999;
    border: 1px solid #eee;
    display: none;
}
.link {
    border: 0;
    padding: 9px;
    border-radius: 5px;
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
            <div  style=" direction: rtl; " class="card-body">
 
                <div class="table-responsive text-right" dir="rtl">
                    <table class="table mb-0 dataTable">
                        <thead class="table-light">
                            <tr>
                                <th>{{__('Order')}}#</th>
                                <th>
                                    {{__('Customer')}}
                                </th>
                                <th>
                                    {{__('Status')}}
                                </th>
                                <th>
                                    {{__('Total')}}
                                </th>
                                <th>
                                    {{__('Date')}}
                                </th>
                                <th>
                                    {{__('Details')}}
                                </th>
                                @if (auth()->user()->role == 1)
                                <th>
                                    {{__('Action')}}
                                </th>
                                @endif
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($orders as $order)
                            <tr>
                                <td>
                                    <div class="d-flex align-items-center">

                                        <div class="ms-2">
                                            <h6 class="mb-0 font-14">#OS-{{$order->id}}</h6>
                                        </div>
                                    </div>
                                </td>
                                <td>{{$order->user_id ? $order->user->name : $order->name}}</td>
                                <td>
                                    <div class="badge rounded-pill text-{{$order->status == 'pending' ? 'warning' : 'success'}} bg-light-{{$order->status == 'pending' ? 'warning' : 'success'}} p-2 text-uppercase px-3">
                                        <i class="bx bxs-circle me-1"></i>
                                        {{$order->status}}
                                    </div>
                                </td>
                                <td>{{$order->total_price}} EGP</td>
                                <td>{{$order->created_at}}</td>
                               
                               
                                <td>
                                    <div class="details" id="info_{{$order->id}}">
                                        <div class="close close-info">
                                            <i class="bx bx-x"></i> 
                                        </div>
                                        <div class="container">
                                             <div class="row">
                                                 <div class="col-md-6">
                                                    <div class="address">
                                                        <h6 class="mb-0">
                                                          {{__('Shipping Address')}}    
                                                        </h6>
                                                        <p class="mb-0">{{$order->address}}</p>
                                                     </div>
                                                 </div>
                                                 <div class="col-md-6">
                                                    <div class="contact">
                                                        <h6 class="mb-0">
                                                            {{__('Contact')}}
                                                        </h6>
                                                        <p class="mb-0">{{$order->phone}}</p>
                                                     </div>
                                                 </div>
                                             </div>

                                             <hr>
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
                                                @foreach ($order->order_items as $key => $item)
                                                <div class="col-md-3">
                                                   #{{$key+1}} <img class="img-fluid" width="100" src="{{asset('storage/'.  $item->product->cover)}}" alt="" srcset=""> {{$item->product->name}}
                                                </div>
                                                <div class="col-md-3">
                                                    <strong>{{$item->product->price}}</strong>
                                                </div>
                                                <div class="col-md-3">
                                                    <strong>{{$item->quantity}}</strong>
                                                </div>
                                                <div class="col-md-3">
                                                    <strong>{{$item->product->price * $item->quantity}}</strong>
                                                </div>
                                                @endforeach
                                            </div>
                                        </div>
                                       
                                         
                                    </div>
                                    
                                    <button order_id="{{$order->id}}" type="button" class="btn btn-primary order-info btn-sm radius-30 px-4">
                                       {{__('Details')}}
                                    </button>
                                </td>
                                @if (auth()->user()->role == 1)
                                <td>
                                    <div class="d-flex order-actions">
                                      <form action="{{route('approve_order')}}" method="post">
                                        @csrf
                                        <input type="hidden" name="order_id" value="{{$order->id}}">
                                        <button type="submit" class="text-success link ml-2"><i class="fa fa-check"></i></button>
                                      </form>
                                        <a href="javascript:;" data-toggle="modal" data-target="#DeleteCat" order_id="{{$order->id}}" class="ms-3 text-danger delete_order"><i class="bx bxs-trash"></i></a>
                                    </div>
                                </td>
                                @endif
                            </tr>    
                            @endforeach

          
                        </tbody>
                    </table>
                </div>
            </div>
        </div>


    </div>
</div>

@include('shop.orders.delete')
@endsection

@section('scripts')

<script src="{{asset('js/app.js')}}"></script>
<script src="{{asset('js/lobibox.min.js')}}"></script>
<script src="{{asset('js/notify.js')}}"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.11.3/datatables.min.js"></script>
 <script src="https://cdn.datatables.net/rowreorder/1.2.8/js/dataTables.rowReorder.min.js"></script>
<script src="https://cdn.datatables.net/responsive/2.2.9/js/dataTables.responsive.min.js"></script>

<script>
 var lightbox = GLightbox({'selector': 'glightbox-demo'});

 $(document).ready(function(){

    $(document).on('click', '.delete_order', function(){
        var id = $(this).attr('order_id');
        $('.order_id').val(id);
    });

    $('.dataTable').DataTable({
        rowReorder: {
            selector: 'td:nth-child(2)'
        },
        responsive: true
    } );

    setInterval(function(){  
       $('.previous').html('<i class="bx bx-skip-next-circle"></i>');
      $('.next').html('<i class="bx bx-skip-previous-circle"></i>');
      },500);

    $('#DataTables_Table_0_filter').addClass('d-lg-flex align-items-center mb-4 gap-3')
    $('#DataTables_Table_0_filter input').addClass('form-control ps-5 radius-30');
    $('#DataTables_Table_0_filter input').attr('placeholder','Search Order');
   // $('#DataTables_Table_0_filter label').append('<span style=" left: 74px; " class="position-absolute top-50 product-show translate-middle-y"><i class="bx bx-search"></i></span>');
    $('#DataTables_Table_0_filter label').addClass('position-relative');
    $('.dataTables_length').hide();
 
 $(document).on('click','.order-info',function(){
     
    var order_id = $(this).attr('order_id');
   // alert(order_id);
    $(this).parent().find('.details').slideToggle('show');
    });

    $(document).on('click','.close-info',function(){
        $(this).parent().slideToggle();

    });

 

    });

</script>
@endsection