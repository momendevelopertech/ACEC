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
                Section::make('Message Details')->schema([
                    TextInput::make('name')->label('Name')->disabled(),
                    TextInput::make('email')->label('Email')->disabled(),
                    TextInput::make('phone')->label('Phone')->disabled(),
                    TextInput::make('subject')->label('Subject')->disabled(),
                    Textarea::make('message')->label('Message')->disabled()->rows(5)->columnSpanFull(),
                    TextInput::make('service_type')->label('Service Type')->disabled(),
                ])->columns(2),

                Section::make('Status')->schema([
                    Select::make('lang')->options(['ar' => 'Arabic', 'en' => 'English'])->disabled(),
                    Toggle::make('is_read')->label('Mark as Read'),
                    Toggle::make('is_replied')->label('Mark as Replied'),
                    Textarea::make('reply_text')->label('Reply Notes')->rows(3),
                ])->columns(2),
            ]);
    }
}
