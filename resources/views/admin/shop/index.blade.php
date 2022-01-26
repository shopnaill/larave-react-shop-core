@php
$react = false;
@endphp
@extends('layouts.app')

@section('content')

    <style>


    </style>
    <div class="container">
        <h1 class="text-center">
            {{ __('Control Panel') }}
        </h1>
        <hr>
        <br>
        <div class="row">
            <div class="col-md-4 col-6 col-xl-3">
                <div class="card bg-c-light order-card">
                    <div type="button" data-bs-toggle="modal" data-bs-target="#AddModal" class="card-block">
                        <h6 class="m-b-20">
                            {{ __('Products') }}
                        </h6>
                        <h2 class="text-right"><i style=" color: #4caf50; " class="fa fa-cookie-bite  f-left"></i><span
                                class="text-white">0</span></h2>
                        <p class="m-b-0"> {{ __('Clients') }} <span class="f-right"></span></p>
                    </div>
                </div>
            </div>

            <div class="col-md-4 col-6 col-xl-3">
                <a href="">
                    <div class="card bg-c-light order-card">
                        <div class="card-block">
                            <h6 class="m-b-20"> {{ __('Main Categories') }} </h6>
                            <h2 class="text-right"><i style=" color: #2196f3; "
                                    class="fa fa-rocket f-left"></i><span>0</span></h2>
                            <p class="m-b-0"> {{ __('Total Clients') }}<span class="f-right"></span></p>
                        </div>
                    </div>
                </a>
            </div>

            <div class="col-md-4 col-6 col-xl-3">
                <a href="">
                    <div class="card bg-c-light order-card">
                        <div class="card-block">
                            <h6 class="m-b-20">{{ __('Sub Categories') }}</h6>
                            <h2 class="text-right"><i style=" color: #ffc107; "
                                    class="fa fa-list f-left"></i><span>10</span></h2>
                            <p class="m-b-0 text-danger">{{ __('Message') }} <span class="f-right"></span> </p>
                        </div>
                    </div>
                </a>
            </div>
            <div class="col-md-4 col-6 col-xl-3">
                <a href="">
                    <div class="card bg-c-light order-card">
                        <div class="card-block">
                            <h6 class="m-b-20">{{ __('Orders') }} </h6>
                            <h2 class="text-right"><i style=" color: #009688; "
                                    class="fa fa-shopping-basket f-left"></i><span>12</span></h2>
                            <p class="m-b-0"> {{ __('Manage Orders') }}<span class="f-right"> </span></p>
                        </div>
                    </div>
                </a>

            </div>



        </div>
    </div>

@endsection
