<?php

namespace App\Filament\Resources\Clients\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ClientForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name_ar')
                    ->label(__('admin.col_name_ar'))
                    ->required(),
                TextInput::make('name_en')
                    ->label(__('admin.col_name_en'))
                    ->required(),
                FileUpload::make('logo')
                    ->label(__('admin.col_logo'))
                    ->image()
                    ->disk('public')
                    ->directory('models/clients')
                    ->maxSize(2048)
                    ->imageEditor()
                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
                TextInput::make('website')
                    ->label(__('admin.col_website'))
                    ->url(),
                TextInput::make('order')
                    ->label(__('admin.col_order'))
                    ->required()
                    ->numeric()
                    ->default(0),
                Toggle::make('is_active')
                    ->label(__('admin.col_is_active'))
                    ->required(),
            ]);
    }
}
