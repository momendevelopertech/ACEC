<?php

namespace App\Filament\Resources\Contacts\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ContactForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make(__('admin.section_message_details'))->schema([
                    TextInput::make('name')->label(__('admin.col_name'))->disabled(),
                    TextInput::make('email')->label(__('admin.col_email'))->disabled()->extraAttributes(['dir' => 'ltr']),
                    TextInput::make('phone')->label(__('admin.col_phone'))->disabled(),
                    TextInput::make('subject')->label(__('admin.col_subject'))->disabled(),
                    Textarea::make('message')->label(__('admin.col_message'))->disabled()->rows(5)->columnSpanFull(),
                    TextInput::make('service_type')->label(__('admin.col_service'))->disabled(),
                ])->columns(2),

                Section::make(__('admin.section_status'))->schema([
                    Select::make('lang')
                        ->options([
                            'ar' => __('admin.col_lang_ar'),
                            'en' => __('admin.col_lang_en'),
                        ])
                        ->disabled(),
                    Toggle::make('is_read')->label(__('admin.col_read')),
                    Toggle::make('is_replied')->label(__('admin.btn_mark_replied')),
                    Textarea::make('reply_text')->label(__('admin.col_reply_notes'))->rows(3),
                ])->columns(2),
            ]);
    }
}
