<?php

namespace App\Filament\Resources\Themes\Schemas;

use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ThemeForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(1)
            ->components([
                Section::make(__('admin.theme_info'))
                    ->columns(2)
                    ->schema([
                        TextInput::make('name')
                            ->label(__('admin.col_name'))
                            ->required()
                            ->maxLength(255),
                        TextInput::make('name_ar')
                            ->label(__('admin.col_name_ar'))
                            ->maxLength(255),
                        TextInput::make('slug')
                            ->label(__('admin.col_slug'))
                            ->required()
                            ->maxLength(255),
                        Toggle::make('is_active')
                            ->label(__('admin.col_is_active')),
                    ]),

                Section::make(__('admin.theme_colors'))
                    ->columns(2)
                    ->schema([
                        ColorPicker::make('colors.background')
                            ->label('Background (e.g. #F8FAFC)'),
                        ColorPicker::make('colors.surface')
                            ->label('Surface/Cards (e.g. #FFFFFF)'),
                        ColorPicker::make('colors.accent')
                            ->label('Accent/Brand (e.g. #C9A84C)'),
                        ColorPicker::make('colors.text')
                            ->label('Text Primary (e.g. #0F172A)'),
                    ]),

                Section::make(__('admin.theme_typography'))
                    ->columns(2)
                    ->schema([
                        TextInput::make('typography.font_ar')
                            ->label(__('admin.color_font_ar')),
                        TextInput::make('typography.font_en')
                            ->label(__('admin.color_font_en')),
                    ]),

                Section::make(__('admin.theme_layout'))
                    ->columns(2)
                    ->schema([
                        TextInput::make('layout.border_radius')
                            ->label(__('admin.color_border_radius')),
                    ]),
            ]);
    }
}
