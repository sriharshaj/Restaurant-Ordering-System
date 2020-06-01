class Api::V1::ItemsController < ApplicationController
  before_action :item, only: [:show, :update, :destroy]
  def index
    render json: Item.all
  end

  def show
    render json: @item
  end

  def create
    @item = Item.new
    @item.assign_attributes(item_params)
    if @item.save
      render json: @item
    else
      render json: @item.errors
    end
  end

  def update
    @item.assign_attributes(item_params)
    if @item.save
      render json: @item
    else
      render json: @item.errors
    end
  end

  def destroy
    @item&.destroy
    render json: { message: 'Item deleted!'}
  end

  private

  def item_params
    params.permit(:name, :cost, :image_url, :ingredients, :description, :cusine, :type)
  end

  def item
    @item ||= Item.find(params[:id])
  end
end
