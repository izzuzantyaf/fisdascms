<div class="handout-section col-span-full sm:col-span-6 flex flex-col gap-4">
    <div class="flex items-center justify-between">
        <div class="handout-info">
            <div class="handout-title text-2xl font-semibold">{{ $faculty }}</div>
            <div class="handout-lang"><?= $lang === 'id' ? 'Bahasa Indonesia' : 'English' ?></div>
        </div>
        <div id="visibility-{{$id}}" class="visibility-toggler flex <?= $visibility ? 'bg-green-500 justify-end' : 'bg-gray-300' ?> rounded-full w-10 p-1 items-center gap-2 cursor-pointer">
            <input type="hidden" name="handouts[{{ $id }}][visibility]" id="visibility-{{$id}}" value="{{ $visibility }}" />
            <div class="toggler-btn w-4 h-4 bg-white rounded-full"></div>
        </div>
    </div>
    <input type="url" name="handouts[{{ $id }}][file_url]" class="p-2 focus:ring-indigo-500 focus:border-blue-500 shadow-sm border rounded-md border-gray-300" placeholder="Link" value="{{ $file_url }}">
</div>