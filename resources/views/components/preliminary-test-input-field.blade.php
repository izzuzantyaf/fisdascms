<div class="preliminary-test-section flex flex-col gap-4">
    <div class="flex items-center justify-between">
        <div class="preliminary-test-info flex gap-4">
            <div class="icon flex justify-center items-center w-16">
                <i class="<?= $icon ?> text-3xl"></i>
            </div>
            <div>
                <div class="preliminary-test-acronym text-2xl font-semibold"><?= $acronym ?></div>
                <div class="preliminary-test-name"><?= $name ?></div>
            </div>
        </div>
    </div>
    <div class="preliminary-test-link-input flex border rounded-md">
        <input type="url" name="<?= 'preliminary_test_link_' . $id ?>" id="<?= 'preliminary_test_link_' . $id ?>" class="p-2 focus:ring-indigo-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 flex-grow rounded-l-md" placeholder="File url" value="<?= $link ?>" disabled>
        <div id="<?= 'preliminary_test_link_' . $id ?>" class="edit-icon rounded-r-md p-2 flex justify-center items-center bg-gray-50 hover:bg-gray-100 cursor-pointer">
            <i class="fas fa-pen text-gray-500"></i>
        </div>
    </div>
</div>