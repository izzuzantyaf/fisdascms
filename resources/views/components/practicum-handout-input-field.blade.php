<div class="handout-section flex flex-col gap-4">
    <div class="handout-info">
        <div class="handout-title text-2xl font-semibold">{{ $faculty }}</div>
        <div class="handout-lang"><?= $lang === 'id' ? 'Bahasa Indonesia' : 'English' ?></div>
    </div>
    <div class="handout-link-input flex border rounded-md">
        <input type="url" name="<?= $faculty . '_' . $semester . '_' . $lang . '_handout' ?>" id="<?= $faculty . '_' . $semester . '_' . $lang . '_handout' ?>" class="p-2 focus:ring-indigo-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 flex-grow rounded-l-md" placeholder="File link" value="<?= $file_url ?>" disabled>
        <div id="<?= $faculty . '_' . $semester . '_' . $lang . '_handout' ?>" class="edit-icon rounded-r-md p-2 flex justify-center items-center bg-gray-50 hover:bg-gray-100 cursor-pointer">
            <i class="fas fa-pen text-gray-500"></i>
        </div>
    </div>
</div>