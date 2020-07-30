<?php

namespace Biz\Goods\Service\Impl;

use AppBundle\Common\ArrayToolkit;
use Biz\BaseService;
use Biz\Common\CommonException;
use Biz\Course\Service\CourseSetService;
use Biz\Goods\Dao\GoodsDao;
use Biz\Goods\Dao\GoodsSpecsDao;
use Biz\Goods\GoodsEntityFactory;
use Biz\Goods\GoodsException;
use Biz\Goods\Service\GoodsService;
use Biz\Product\Service\ProductService;

class GoodsServiceImpl extends BaseService implements GoodsService
{
    public function getGoods($id)
    {
        return $this->getGoodsDao()->get($id);
    }

    public function createGoods($goods)
    {
        if (!ArrayToolkit::requireds($goods, ['productId', 'title', 'type'])) {
            $this->createNewException(CommonException::ERROR_PARAMETER_MISSING());
        }

        $goods = ArrayToolkit::parts($goods, [
            'type',
            'productId',
            'title',
            'subtitle',
            'status',
            'summary',
            'orgId',
            'orgCode',
            'images',
            'creator',
            'minPrice',
            'maxPrice',
        ]);

        return $this->getGoodsDao()->create($goods);
    }

    public function publishGoods($id)
    {
        return $this->getGoodsDao()->update($id, ['status' => 'published', 'publishedTime' => time()]);
    }

    public function unpublishGoods($id)
    {
        return $this->getGoodsDao()->update($id, ['status' => 'unpublished', 'publishedTime' => time()]);
    }

    public function recommendGoods($id, $weight)
    {
        return $this->getGoodsDao()->update($id, ['recommendWeight' => $weight, 'recommendedTime' => time()]);
    }

    public function cancelRecommendGoods($id)
    {
        return $this->getGoodsDao()->update($id, ['recommendWeight' => 0, 'recommendedTime' => 0]);
    }

    public function updateGoods($id, $goods)
    {
        $goods = ArrayToolkit::parts($goods, [
            'type', //type不应该被更新，后面去掉
            'title',
            'images',
            'subtitle',
            'status',
            'summary',
            'orgId',
            'orgCode',
            'categoryId',
            'minPrice',
            'maxPrice',
            'maxRate',
            'ratingNum',
            'rating',
            'hitNum',
            'hotSeq',
            'recommendWeight',
            'recommendedTime',
        ]);

        return $this->getGoodsDao()->update($id, $goods);
    }

    public function updateGoodsMinAndMaxPrice($goodsId)
    {
        $specs = $this->findPublishedGoodsSpecsByGoodsId($goodsId);
        if (empty($specs)) {
            return $this->getGoodsDao()->update(
                $goodsId,
                ['minPrice' => 0.00, 'maxPrice' => 0.00]
            );
        }

        $prices = ArrayToolkit::column($specs, 'price');
        asort($prices);

        return $this->getGoodsDao()->update(
            $goodsId,
            ['minPrice' => current($prices), 'maxPrice' => end($prices)]
        );
    }

    public function deleteGoods($id)
    {
        return $this->getGoodsDao()->delete($id);
    }

    public function countGoods($conditions)
    {
        return $this->getGoodsDao()->count($conditions);
    }

    public function searchGoods($conditions, $orderBys, $start, $limit, $columns = [])
    {
        return $this->getGoodsDao()->search($conditions, $orderBys, $start, $limit, $columns);
    }

    /**
     * @param $productId
     *
     * @return mixed
     *               如果未来业务改造成 产品：商品 1：n 后，getGoodsByProductId就应该被舍弃，不再使用
     */
    public function getGoodsByProductId($productId)
    {
        return $this->getGoodsDao()->getByProductId($productId);
    }

    public function changeGoodsMaxRate($id, $maxRate)
    {
        $goods = $this->getGoods($id);
        $this->checkGoodsPermission($goods);

        return $this->getGoodsDao()->update($id, ['maxRate' => $maxRate]);
    }

    public function createGoodsSpecs($goodsSpecs)
    {
        if (!ArrayToolkit::requireds($goodsSpecs, [
            'goodsId',
            'targetId',
            'title',
        ])) {
            $this->createNewException(CommonException::ERROR_PARAMETER_MISSING());
        }

        $goodsSpecs = ArrayToolkit::parts($goodsSpecs, [
            'goodsId',
            'targetId',
            'status',
            'title',
            'images',
            'seq',
            'usageMode',
            'usageDays',
            'usageStartTime',
            'usageEndTime',
            'buyable',
            'buyableStartTime',
            'buyableEndTime',
        ]);

        return $this->getGoodsSpecsDao()->create($goodsSpecs);
    }

    public function getGoodsSpecs($id)
    {
        return $this->getGoodsSpecsDao()->get($id);
    }

    public function updateGoodsSpecs($id, $goodsSpecs)
    {
        $goodsSpecs = ArrayToolkit::parts($goodsSpecs, [
            'title',
            'images',
            'price',
            'status',
            'seq',
            'coinPrice',
            'usageMode',
            'usageDays',
            'usageStartTime',
            'usageEndTime',
            'buyable',
            'buyableStartTime',
            'buyableEndTime',
            'maxJoinNum',
            'services',
        ]);

        return $this->getGoodsSpecsDao()->update($id, $goodsSpecs);
    }

    public function changeGoodsSpecsPrice($specsId, $price)
    {
        $specs = $this->getGoodsSpecs($specsId);
        if (empty($specs)) {
            $this->createNewException(GoodsException::SPECS_NOT_FOUND());
        }
        $goods = $this->getGoods($specs['goodsId']);
        $this->checkGoodsPermission($goods);

        $specs = $this->getGoodsSpecsDao()->update($specsId, ['price' => $price]);
        $this->updateGoodsMinAndMaxPrice($goods['id']);

        return $specs;
    }

    public function publishGoodsSpecs($id)
    {
        $specs = $this->getGoodsSpecsDao()->update($id, ['status' => 'published']);
        $this->updateGoodsMinAndMaxPrice($specs['goodsId']);

        return $specs;
    }

    public function unpublishGoodsSpecs($id)
    {
        $specs = $this->getGoodsSpecsDao()->update($id, ['status' => 'unpublished']);
        $this->updateGoodsMinAndMaxPrice($specs['goodsId']);

        return $specs;
    }

    public function deleteGoodsSpecs($id)
    {
        return $this->getGoodsSpecsDao()->delete($id);
    }

    public function getGoodsSpecsByGoodsIdAndTargetId($goodsId, $targetId)
    {
        return $this->getGoodsSpecsDao()->getByGoodsIdAndTargetId($goodsId, $targetId);
    }

    public function findGoodsSpecsByGoodsId($goodsId)
    {
        return $this->getGoodsSpecsDao()->findByGoodsId($goodsId);
    }

    public function findPublishedGoodsSpecsByGoodsId($goodsId)
    {
        return $this->getGoodsSpecsDao()->findPublishedByGoodsId($goodsId);
    }

    public function getGoodsSpecsByProductIdAndTargetId($productId, $targetId)
    {
        $goods = $this->getGoodsByProductId($productId);
        if (empty($goods)) {
            $this->createNewException(GoodsException::GOODS_NOT_FOUND());
        }

        return $this->getGoodsSpecsByGoodsIdAndTargetId($goods['id'], $targetId);
    }

    public function findGoodsByIds($ids)
    {
        return  ArrayToolkit::index($this->getGoodsDao()->findByIds($ids), 'id');
    }

    public function findGoodsByProductIds(array $productIds)
    {
        return $this->getGoodsDao()->findByProductIds($productIds);
    }

    public function findGoodsSpecsByIds(array $ids)
    {
        return ArrayToolkit::index($this->getGoodsSpecsDao()->findByIds($ids), 'id');
    }

    /**
     * @param $goods
     *
     * @return bool
     *              大于管理员的权限，教师权限且是当前商品的创建者,
     *              历史原因，如果满足实体（课程、班级等）的管理权限，也可以管理
     */
    public function canManageGoods($goods)
    {
        return $this->getCurrentUser()->isAdmin() || ($this->getCurrentUser()->isTeacher() && $this->isGoodsCreator($goods)) || $this->hasTargetManageRole($goods);
    }

    public function refreshGoodsHotSeq()
    {
        return $this->getGoodsDao()->refreshHotSeq();
    }

    protected function checkGoodsPermission($goods)
    {
        if (empty($goods)) {
            $this->createNewException(GoodsException::GOODS_NOT_FOUND());
        }
        if (!$this->canManageGoods($goods)) {
            $this->createNewException(GoodsException::FORBIDDEN_MANAGE_GOODS());
        }
    }

    protected function hasTargetManageRole($goods)
    {
        return $this->getGoodsEntityFactory()->create($goods['type'])->canManageTarget($goods);
    }

    /**
     * @param $goods
     *
     * @return bool
     *              创建者Id不为空，且创建者Id等于当前用户Id
     */
    protected function isGoodsCreator($goods)
    {
        return $goods['creator'] && (int) $goods['creator'] === (int) $this->getCurrentUser()->getId();
    }

    /**
     * @return GoodsEntityFactory
     */
    protected function getGoodsEntityFactory()
    {
        return $this->biz['goods.entity.factory'];
    }

    /**
     * @return GoodsDao
     */
    protected function getGoodsDao()
    {
        return $this->createDao('Goods:GoodsDao');
    }

    /**
     * @return GoodsSpecsDao
     */
    protected function getGoodsSpecsDao()
    {
        return $this->createDao('Goods:GoodsSpecsDao');
    }

    /**
     * @return ProductService
     */
    protected function getProductService()
    {
        return $this->createService('Product:ProductService');
    }

    /**
     * @return CourseSetService
     */
    protected function getCourseSetService()
    {
        return $this->createService('Course:CourseSetService');
    }
}
