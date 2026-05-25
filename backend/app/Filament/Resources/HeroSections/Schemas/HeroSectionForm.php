<?php

namespace App\Filament\Resources\HeroSections\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class HeroSectionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('lang')
                    ->label(__('admin.col_lang'))
                    ->options([
                        'ar' => __('admin.col_lang_ar'),
                        'en' => __('admin.col_lang_en'),
                    ])
                    ->required(),

                TextInput::make('title')
                    ->label(__('admin.col_hero_title'))
                    ->required(),

                TextInput::make('subtitle')
                    ->label(__('admin.col_hero_subtitle')),

                Textarea::make('description')
                    ->label(__('admin.col_hero_description'))
                    ->columnSpanFull(),

                FileUpload::make('image')
                    ->label(__('admin.col_image'))
                    ->image()
                    ->disk('public')
                    ->directory('models/hero')
                    ->maxSize(2048)
                    ->imageEditor()
                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp', 'image/gif']),

                Section::make(__('admin.section_hero_stats'))
                    ->columns(2)
                    ->schema([
                        TextInput::make('stat1_number')
                            ->label(__('admin.col_stat_number') . ' 1')
                            ->placeholder('+25'),
                        TextInput::make('stat1_label')
                            ->label(__('admin.col_stat_label') . ' 1')
                            ->placeholder('Years Experience'),
                        TextInput::make('stat2_number')
                            ->label(__('admin.col_stat_number') . ' 2')
                            ->placeholder('+2500'),
                        TextInput::make('stat2_label')
                            ->label(__('admin.col_stat_label') . ' 2')
                            ->placeholder('Projects'),
                        TextInput::make('stat3_number')
                            ->label(__('admin.col_stat_number') . ' 3')
                            ->placeholder('2006'),
                        TextInput::make('stat3_label')
                            ->label(__('admin.col_stat_label') . ' 3')
                            ->placeholder('Established'),
                        TextInput::make('stat4_number')
                            ->label(__('admin.col_stat_number') . ' 4')
                            ->placeholder('+99%'),
                        TextInput::make('stat4_label')
                            ->label(__('admin.col_stat_label') . ' 4')
                            ->placeholder('Satisfaction'),
                    ]),

                Section::make(__('admin.section_hero_ctas'))
                    ->columns(2)
                    ->schema([
                        TextInput::make('cta1_text')
                            ->label(__('admin.col_cta_text') . ' 1'),
                        TextInput::make('cta1_link')
                            ->label(__('admin.col_cta_link') . ' 1')
                            ->placeholder('/services'),
                        TextInput::make('cta2_text')
                            ->label(__('admin.col_cta_text') . ' 2'),
                        TextInput::make('cta2_link')
                            ->label(__('admin.col_cta_link') . ' 2')
                            ->placeholder('/contact'),
                    ]),
            ]);
    }
}
