<nav class="bg-blue-700 h-16">
    <div class="container relative flex items-center justify-between mx-auto px-4 lg:justify-end h-16">

        <!-- Mobile menu button-->
        <button class="hamburger-menu lg:hidden inline-flex items-center justify-center p-2 rounded-md text-blue-400 hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-expanded="false">
            <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>

        <button class="avatar bg-blue-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white" id="user-menu" aria-haspopup="true">
            <span class="sr-only">Open user menu</span>
            <div class="h-8 w-8 rounded-full text-white flex items-center justify-center">
                W
            </div>
        </button>

        <div class="profile-dropdown origin-top-right absolute right-4 mt-40 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 transition ease-in-out duration-200 transform scale-0" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100" role="menuitem">Your Profile</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100" role="menuitem">Settings</a>
            <a href="/logout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100" role="menuitem">Sign out</a>
        </div>
    </div>
</nav>