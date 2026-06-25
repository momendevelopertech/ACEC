<?php

namespace App\Filament\Resources\HeroSections\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class HeroSectionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('lang')
                    ->label(__('admin.col_lang'))
                    ->required()
                    ->maxLength(2),

                TextInput::make('title')
                    ->label(__('admin.col_hero_title'))
                    ->required()
                    ->maxLength(255),

                TextInput::make('subtitle')
                    ->label(__('admin.col_hero_subtitle'))
                    ->maxLength(255),

                Textarea::make('description')
                    ->label(__('admin.col_hero_description')),

                FileUpload::make('image')
                    ->label(__('admin.col_image'))
                    ->image()
                    ->disk('public')
                    ->directory('models/hero')
                    ->maxSize(5120)
                    ->imageEditor()
                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp', 'image/gif']),

                Section::make(__('admin.section_hero_stats'))
                    ->columns(2)
                    ->schema([
                        TextInput::make('stat1_number')
                            ->label(__('admin.col_stat_number') . ' 1'),
                        TextInput::make('stat1_label')
                            ->label(__('admin.col_stat_label') . ' 1'),
                        TextInput::make('stat2_number')
                            ->label(__('admin.col_stat_number') . ' 2'),
                        TextInput::make('stat2_label')
                            ->label(__('admin.col_stat_label') . ' 2'),
                        TextInput::make('stat3_number')
                            ->label(__('admin.col_stat_number') . ' 3'),
                        TextInput::make('stat3_label')
                            ->label(__('admin.col_stat_label') . ' 3'),
                        TextInput::make('stat4_number')
                            ->label(__('admin.col_stat_number') . ' 4'),
                        TextInput::make('stat4_label')
                            ->label(__('admin.col_stat_label') . ' 4'),
                    ]),

                Section::make(__('admin.section_hero_ctas'))
                    ->columns(2)
                    ->schema([
                        TextInput::make('cta1_text')
                            ->label(__('admin.col_cta_text') . ' 1'),
                        TextInput::make('cta1_link')
                            ->label(__('admin.col_cta_link') . ' 1'),
                        TextInput::make('cta2_text')
                            ->label(__('admin.col_cta_text') . ' 2'),
                        TextInput::make('cta2_link')
                            ->label(__('admin.col_cta_link') . ' 2'),
                    ]),
            ]);
    }
}
