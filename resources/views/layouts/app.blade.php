<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    @if (!isset($react))
      <script src="{{ asset('js/app.js') }}" defer></script>
    @endif

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

    <link rel="stylesheet" href="https://codervent.com/rocker/demo/vertical/assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://codervent.com/rocker/demo/vertical/assets/css/bootstrap-extended.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs5/dt-1.11.3/datatables.min.css" />
    <link rel="stylesheet" href="https://cdn.datatables.net/rowreorder/1.2.8/css/rowReorder.dataTables.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.2.9/css/responsive.dataTables.min.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" rel="stylesheet">
   
    <link rel="stylesheet" type="text/css"
        href="https://cdn.datatables.net/v/bs4/dt-1.11.3/r-2.2.9/rg-1.1.4/datatables.min.css" />
    <link rel="stylesheet" href="https://gym.sonorcastle.com/css/style.css">
    <link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet"
        href="https://codervent.com/rocker/demo/vertical/assets/plugins/metismenu/css/metisMenu.min.css">
    <link rel="stylesheet" href="https://gym.sonorcastle.com/css/lobibox.min.css">
    <link rel="stylesheet" href="https://gym.sonorcastle.com/css/nav.css">
    <link rel="stylesheet" href="https://gym.sonorcastle.com/css/perfect-scrollbar.css">
    <script src="https://cdn.jsdelivr.net/npm/pace-js@latest/pace.min.js"></script>
    <link rel="stylesheet" href="{{asset('css/pace.css')}}">
</head>

<body>
    @if (Auth::user())
        <script>
            let user = {
                id: {{ Auth::user()->id }},
                name: '{{ Auth::user()->name }}',
            }
        </script>
    @endif
    <div id="app">
        <div id="navbarRouter"></div>

        <main class="py-4">
            @yield('content')
        </main>
    </div>

    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/v/bs4/dt-1.11.3/r-2.2.9/rg-1.1.4/datatables.min.js">
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.form/4.2.2/jquery.form.js"></script>

    @yield('scripts')
</body>

</html>
