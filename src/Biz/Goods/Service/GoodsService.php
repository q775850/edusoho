<?php

namespace Biz\Goods\Service;

interface GoodsService
{
    public function getGoods($id);

    public function createGoods($goods);

    public function updateGoods($id, $goods);

    public function deleteGoods($id);

    public function publishGoods($id);

    public function unpublishGoods($id);

    public function searchGoods($conditions, $orderBys, $start, $limit, $columns = []);

    public function getGoodsByProductId($productId);

    public function createGoodsSpecs($goodsSpecs);

    public function getGoodsSpecs($id);

    public function updateGoodsSpecs($id, $goodsSpecs);

    public function publishGoodsSpecs($id);

    public function unpublishGoodsSpecs($id);

    public function deleteGoodsSpecs($id);

    public function getGoodsSpecsByGoodsIdAndTargetId($goodsId, $targetId);

    public function findGoodsSpecsByGoodsId($goodsId);

    public function getGoodsSpecsByProductIdAndTargetId($productId, $targetId);

    public function findGoodsByIds($ids);

    public function findGoodsByProductIds(array $productIds);

    public function refreshGoodsHotSeq();

    public function findGoodsSpecsByIds(array $ids);
}
