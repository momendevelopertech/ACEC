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
                    ->columns(3)
                    ->schema([
                        ColorPicker::make('colors.bg_primary')
                            ->label(__('admin.color_bg_primary')),
                        ColorPicker::make('colors.bg_secondary')
                            ->label(__('admin.color_bg_secondary')),
                        ColorPicker::make('colors.bg_card')
                            ->label(__('admin.color_bg_card')),
                        ColorPicker::make('colors.bg_section_alt')
                            ->label(__('admin.color_bg_section_alt')),
                        ColorPicker::make('colors.text_primary')
                            ->label(__('admin.color_text_primary')),
                        ColorPicker::make('colors.text_secondary')
                            ->label(__('admin.color_text_secondary')),
                        ColorPicker::make('colors.text_muted')
                            ->label(__('admin.color_text_muted')),
                        ColorPicker::make('colors.accent')
                            ->label(__('admin.color_accent')),
                        ColorPicker::make('colors.accent_hover')
                            ->label(__('admin.color_accent_hover')),
                        ColorPicker::make('colors.accent_text')
                            ->label(__('admin.color_accent_text')),
                        ColorPicker::make('colors.border')
                            ->label(__('admin.color_border')),
                        ColorPicker::make('colors.navbar_bg')
                            ->label(__('admin.color_navbar_bg')),
                        ColorPicker::make('colors.navbar_text')
                            ->label(__('admin.color_navbar_text')),
                        ColorPicker::make('colors.button_bg')
                            ->label(__('admin.color_button_bg')),
                        ColorPicker::make('colors.button_text')
                            ->label(__('admin.color_button_text')),
                        ColorPicker::make('colors.button_hover')
                            ->label(__('admin.color_button_hover')),
                        ColorPicker::make('colors.card_bg')
                            ->label(__('admin.color_card_bg')),
                        ColorPicker::make('colors.card_border')
                            ->label(__('admin.color_card_border')),
                        ColorPicker::make('colors.footer_bg')
                            ->label(__('admin.color_footer_bg')),
                        ColorPicker::make('colors.footer_text')
                            ->label(__('admin.color_footer_text')),
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
