<?php

namespace App\Filament\Resources\BlogPosts\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class BlogPostForm
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
                Textarea::make('excerpt_ar')
                    ->label(__('admin.col_excerpt_ar'))
                    ->columnSpanFull(),
                Textarea::make('excerpt_en')
                    ->label(__('admin.col_excerpt_en'))
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
                    ->directory('models/blog-posts')
                    ->maxSize(2048)
                    ->imageEditor()
                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
                TextInput::make('category')
                    ->label(__('admin.col_category')),
                TextInput::make('tags')
                    ->label(__('admin.col_tags')),
                Select::make('author_id')
                    ->label(__('admin.col_author'))
                    ->relationship('author', 'name'),
                Toggle::make('is_published')
                    ->label(__('admin.col_is_published'))
                    ->required(),
                DateTimePicker::make('published_at')
                    ->label(__('admin.col_published_at')),
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
                TextInput::make('views')
                    ->label(__('admin.col_views'))
                    ->required()
                    ->numeric()
                    ->default(0),
            ]);
    }
}
