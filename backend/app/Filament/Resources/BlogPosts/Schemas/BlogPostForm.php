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
                    ->required(),
                TextInput::make('title_ar')
                    ->required(),
                TextInput::make('title_en')
                    ->required(),
                Textarea::make('excerpt_ar')
                    ->columnSpanFull(),
                Textarea::make('excerpt_en')
                    ->columnSpanFull(),
                Textarea::make('content_ar')
                    ->columnSpanFull(),
                Textarea::make('content_en')
                    ->columnSpanFull(),
                FileUpload::make('image')
                    ->image(),
                TextInput::make('category'),
                TextInput::make('tags'),
                Select::make('author_id')
                    ->relationship('author', 'name'),
                Toggle::make('is_published')
                    ->required(),
                DateTimePicker::make('published_at'),
                TextInput::make('meta_title_ar'),
                TextInput::make('meta_title_en'),
                Textarea::make('meta_desc_ar')
                    ->columnSpanFull(),
                Textarea::make('meta_desc_en')
                    ->columnSpanFull(),
                TextInput::make('views')
                    ->required()
                    ->numeric()
                    ->default(0),
            ]);
    }
}
