<?php

namespace App\Filament\Resources\Certifications\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class CertificationForm
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
                Textarea::make('description_ar')
                    ->label(__('admin.col_description_ar'))
                    ->columnSpanFull(),
                Textarea::make('description_en')
                    ->label(__('admin.col_description_en'))
                    ->columnSpanFull(),
                FileUpload::make('image')
                    ->label(__('admin.col_image'))
                    ->image()
                    ->disk('public')
                    ->directory('models/certifications')
                    ->maxSize(2048)
                    ->imageEditor()
                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
                TextInput::make('issuer_ar')
                    ->label(__('admin.col_issuer_ar')),
                TextInput::make('issuer_en')
                    ->label(__('admin.col_issuer_en')),
                DatePicker::make('issue_date')
                    ->label(__('admin.col_issue_date')),
                DatePicker::make('expiry_date')
                    ->label(__('admin.col_expiry_date')),
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
