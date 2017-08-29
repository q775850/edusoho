<?php

namespace AppBundle\Controller\Order;

use AppBundle\Controller\BaseController;
use Biz\Coupon\Service\CouponService;
use Biz\OrderFacade\Product\Product;
use Biz\OrderFacade\Service\OrderFacadeService;
use Symfony\Component\HttpFoundation\Request;

class OrderRefundController extends BaseController
{
    public function refundAction(Request $request, $orderId)
    {
        $order = $this->getOrderService()->getOrder($orderId);
        $user = $this->getUser();

        if (empty($order)) {
            throw $this->createNotFoundException();
        }

        if ($order['user_id'] !== $user->getId()) {
            throw $this->createAccessDeniedException('you are not allowed');
        }

        if ('POST' == $request->getMethod()) {
            $reason = $request->request->get('reason');
            $applyRefund = $request->request->get('applyRefund','0');
            if (!empty($applyRefund) && $this->canApplyOrderRefund($order)) {
                $this->getOrderRefundService()->applyOrderRefund($order['id'], array(
                    'reason' => 'note',
                ));    
            }
            
            return $this->createJsonResponse(true);
        }

        $maxRefundDays = (int) (($order['refund_deadline'] - $order['finish_time']) / 86400);

        return $this->render('order-refund/refund-modal.html.twig', array(
            'order' => $order,
            'maxRefundDays' => $maxRefundDays,
        ));
    }

    private function canApplyOrderRefund($order)
    {
        return ($order['pay_amount'] > 0) && ($order['refund_deadline']);
    }

    /**
     * @return OrderService
     */
    protected function getOrderService()
    {
        return $this->getBiz()->service('Order:OrderService');
    }

    /**
     * @return OrderService
     */
    protected function getOrderRefundService()
    {
        return $this->getBiz()->service('Order:OrderRefundService');
    }
}