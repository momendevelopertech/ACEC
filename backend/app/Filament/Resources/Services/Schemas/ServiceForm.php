<?php

namespace App\Filament\Resources\Services\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ServiceForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('slug')
                    ->label(__('admin.col_slug'))
                    ->required(),
                TextInput::make('icon')
                    ->label(__('admin.col_icon')),
                TextInput::make('title_ar')
                    ->label(__('admin.col_title_ar'))
                    ->required(),
                TextInput::make('title_en')
                    ->label(__('admin.col_title_en'))
                    ->required(),
                Textarea::make('description_ar')
                    ->label(__('admin.col_description_ar'))
                    ->columnSpanFull(),
                Textarea::make('description_en')
                    ->label(__('admin.col_description_en'))
                    ->columnSpanFull(),
                Textarea::make('content_ar')
                    ->label(__('admin.col_content_ar'))
                    ->columnSpanFull(),
                Textarea::make('content_en')
                    ->label(__('admin.col_content_en'))
                    ->columnSpanFull(),
                FileUpload::make('image')
                    ->label(__('admin.col_image'))
                    ->image()
                    ->disk('public')
                    ->directory('models/services')
                    ->maxSize(2048)
                    ->imageEditor()
                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
                Toggle::make('is_featured')
                    ->label(__('admin.col_is_featured'))
                    ->required(),
                TextInput::make('order')
                    ->label(__('admin.col_order'))
                    ->required()
                    ->numeric()
                    ->default(0),
                Toggle::make('is_active')
                    ->label(__('admin.col_is_active'))
                    ->required(),
                TextInput::make('meta_title_ar')
                    ->label(__('admin.col_meta_title_ar')),
                TextInput::make('meta_title_en')
                    ->label(__('admin.col_meta_title_en')),
                Textarea::make('meta_desc_ar')
                    ->label(__('admin.col_meta_desc_ar'))
                    ->columnSpanFull(),
                Textarea::make('meta_desc_en')
                    ->label(__('admin.col_meta_desc_en'))
                    ->columnSpanFull(),
            ]);
    }
}
