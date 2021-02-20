<div class="preliminary-test-section col-span-full sm:col-span-6 lg:col-span-4 flex flex-col justify-between gap-4">
    <div class="preliminary-test-info flex flex-grow items-center gap-4">
        <div class="icon flex flex-shrink-0 justify-center items-center w-16">
            <i class="<?= $icon ?> text-3xl"></i>
        </div>
        <div class="flex-grow">
            <div class="practicum-module-acronym text-2xl font-semibold"><?= $acronym ?></div>
            <div class="practicum-module-name"><?= $name ?></div>
        </div>
        <div id="<?= 'preliminary_test_visibility-' . $id ?>" class="visibility-toggler self-start flex-shrink-0 flex <?= $visibility ? 'bg-green-500 justify-end' : 'bg-gray-300' ?> rounded-full w-10 p-1 items-center gap-2 cursor-pointer">
            <input type="hidden" name="<?= 'preliminary_test_visibility-' . $id ?>" id="<?= 'preliminary_test_visibility-' . $id ?>" value="<?= $visibility ?>" disabled />
            <div id="<?= 'preliminary_test_visibility-' . $id ?>" class="toggler-btn w-4 h-4 bg-white rounded-full"></div>
        </div>
    </div>
    <div class="preliminary-test-link-input flex border rounded-md">
        <input type="url" name="<?= 'preliminary_test_link-' . $id ?>" id="<?= 'preliminary_test_link-' . $id ?>" class="p-2 focus:ring-indigo-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 flex-grow rounded-l-md" placeholder="File URL" value="<?= $link ?>" disabled>
        <div id="<?= 'preliminary_test_link-' . $id ?>" class="edit-icon rounded-r-md p-2 flex justify-center items-center bg-gray-50 hover:bg-gray-100 cursor-pointer">
            <i class="fas fa-pen text-gray-500"></i>
        </div>
    </div>
</div>