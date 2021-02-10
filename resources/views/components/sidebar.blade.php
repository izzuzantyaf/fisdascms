<aside class="sidebar z-20 w-64 overflow-y-auto bg-gray-100 dark:bg-gray-800 flex-shrink-0 fixed top-0 bottom-0 lg:relative transition ease-in-out duration-500 transform -translate-x-72 lg:translate-x-0">
    <div class="py-4 text-gray-500 dark:text-gray-400">
        <div class="sidebar-header flex flex-col-reverse px-6">
            <a class="text-2xl font-bold text-gray-800 dark:text-gray-200" href="#">
                Fisdas CMS
            </a>
            <div class="back-btn cursor-pointer lg:hidden self-end"><i class="fas fa-arrow-left"></i></div>
        </div>

        <div class="menu-list mt-4">
            @foreach($menu_list as $menu)
            <a href="{{ $menu['route'] }}">
                <div class="relative px-6 py-3 inline-flex items-center w-full text-sm font-semibold text-gray-500 transition-colors duration-150 hover:text-blue-700 dark:hover:text-gray-200 dark:text-gray-100">
                    @if(false)
                    <span class="absolute inset-y-0 left-0 w-1 bg-blue-700 rounded-tr-lg rounded-br-lg" aria-hidden="true"></span>
                    @endif
                    <div class="menu-icon w-12">
                        <i class="{{ $menu['icon'] }} text-2xl"></i>
                    </div>
                    <span class="ml-4">{{ $menu['name'] }}</span>
                </div>
            </a>
            @endforeach
        </div>

    </div>
</aside>