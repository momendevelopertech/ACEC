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
                    ->label(__('admin.col_slug'))
                    ->required(),
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
                    ->directory('models/projects')
                    ->maxSize(2048)
                    ->imageEditor()
                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
                FileUpload::make('gallery')
                    ->label(__('admin.col_gallery'))
                    ->image()
                    ->multiple()
                    ->disk('public')
                    ->directory('models/projects/gallery')
                    ->maxSize(2048)
                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
                TextInput::make('category')
                    ->label(__('admin.col_category')),
                TextInput::make('location_ar')
                    ->label(__('admin.col_location_ar')),
                TextInput::make('location_en')
                    ->label(__('admin.col_location_en')),
                TextInput::make('client_ar')
                    ->label(__('admin.col_client_ar')),
                TextInput::make('client_en')
                    ->label(__('admin.col_client_en')),
                TextInput::make('year')
                    ->label(__('admin.col_year'))
                    ->numeric(),
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
            ]);
    }
}
