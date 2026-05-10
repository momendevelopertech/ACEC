<?php

namespace App\Filament\Resources\Projects\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ProjectForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('slug')
                    ->required(),
                TextInput::make('title_ar')
                    ->required(),
                TextInput::make('title_en')
                    ->required(),
                Textarea::make('description_ar')
                    ->columnSpanFull(),
                Textarea::make('description_en')
                    ->columnSpanFull(),
                Textarea::make('content_ar')
                    ->columnSpanFull(),
                Textarea::make('content_en')
                    ->columnSpanFull(),
                FileUpload::make('image')
                    ->image(),
                TextInput::make('gallery'),
                TextInput::make('category'),
                TextInput::make('location_ar'),
                TextInput::make('location_en'),
                TextInput::make('client_ar'),
                TextInput::make('client_en'),
                TextInput::make('year')
                    ->numeric(),
                Toggle::make('is_featured')
                    ->required(),
                TextInput::make('order')
                    ->required()
                    ->numeric()
                    ->default(0),
                Toggle::make('is_active')
                    ->required(),
                TextInput::make('meta_title_ar'),
                TextInput::make('meta_title_en'),
            ]);
    }
}
